const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const student = require("../models/student");
const { validateStudent } = require("../utils/validator");

// Register
const registerStudent = async (req, res) => {
  try {
    validateStudent(req.body);

    req.body.password = await bcrypt.hash(req.body.password, 10);
    await student.create(req.body);

    res.status(200).json({ success: true, message: "Student Registered Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Login
const loginStudent = async (req, res) => {
  try {
    const people = await student.findOne({ emailId: req.body.emailId });
    if (!people) throw new Error("Invalid Credentials");

    if (!(req.body.emailId === people.emailId))
      throw new Error("Invalid Credentials");

    if (!people.isApprove) {
      return res.status(403).json({ success: false, message: "Account not approved yet" });
    }

    const isAllowed = await bcrypt.compare(req.body.password, people.password);
    if (!isAllowed) throw new Error("Invalid Credentials");

    const token = jwt.sign(
      { id: people.id, emailId: people.emailId },
      "Isha@123",
      { expiresIn: "1h" } // better use 1h instead of 10 sec
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ success: true, message: "Student Login Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Logout
const logoutStudent = (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ success: true, message: "Student Logout Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { registerStudent, loginStudent, logoutStudent };
