const express= require("express");
const router = express.Router();
const { registerTeacher, loginTeacher ,logoutTeacher,fetchTeacherData } = require("../controllers/teacherController");
//const{teacherMiddleware}=require("../middleware/teacherMiddleware");

router.post("/registerTeacher",registerTeacher);

router.post("/loginTeacher",loginTeacher);

router.post("/logoutTeacher",logoutTeacher);

router.post("/fetchTeacherData",fetchTeacherData);
module.exports=router;
//router.post("/registerTeacher",authMiddleware,registerTeacher);