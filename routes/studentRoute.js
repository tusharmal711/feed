const express= require("express");
const router = express.Router();
const { registerStudent, loginStudent ,logoutStudent} = require("../controllers/studentController");

router.post("/registerStudent",registerStudent);

router.post("/loginStudent",loginStudent);

router.post("/logoutStudent",logoutStudent);// for authentication use middleware here

module.exports=router;