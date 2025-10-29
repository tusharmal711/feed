const express= require("express");
const app=express();
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const teacher = require('../models/teacher');
const {validateTeacher}= require("../utils/validator");

app.use(cookieParser());

const registerTeacher = async (req, res) => {
  try {
    validateTeacher(req.body);

    req.body.password = await bcrypt.hash(req.body.password, 10);
    await teacher.create(req.body);

    // send only one success response
    return res.status(200).json({ message: "Teacher Registered Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const loginTeacher=async(req,res)=>{
    try{
       const people = await teacher.findOne({ emailId: req.body.emailId });
      
        if(!(req.body.emailId === people.emailId))  
        { 
            throw new Error("Invalid Credentials");
        }
        if (!people.isApprove) {
            return res.status(403).json({ message: "Account not approved yet" });
        }
        
        const isAllowed=await bcrypt.compare(req.body.password,people.password);

        if(!(isAllowed))
            throw new Error("Invalid Credentials");

        const token = jwt.sign({ id:people.id,emailId:people.emailId}, 'Isha@123',{expiresIn:10});
        
        res.cookie("token",token);
        
        res.status(200).json({ message: "Teacher Login Successfully" });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

const logoutTeacher= (req,res)=>{
    try{
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.status(200).json({ message: "Teacher Logout Successfully" });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}


const fetchTeacherData=async(req,res)=>{
    try{
      const {emailId}=req.body;
       const data = await teacher.findOne({ emailId });
       res.status(200).json({data});
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}





module.exports={ loginTeacher,registerTeacher,logoutTeacher,fetchTeacherData};