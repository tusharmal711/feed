const FeedbackResponse = require("../models/feedbackResponse");
const Student = require("../models/student");
const FeedbackForm = require("../models/feedbackForm");


const getAvailableForms = async (req, res) => {
  try {
    const { stuEmail } = req.body;
     console.log(stuEmail);
    // 1️⃣ Validate input
    if (!stuEmail) {
      return res.status(400).json({ success: false, message: "Student email is required" });
    }

    // 2️⃣ Find the student by email
    const student = await Student.findOne({ emailId: stuEmail });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // 3️⃣ Find feedback forms based on student's course and semester
    const forms = await FeedbackForm.find({
      courseName: student.deptName,
      semester: student.semester,
    }).populate("questions"); // Optional: populate question details

    // 4️⃣ Return response
    res.status(200).json({
      success: true,
      count: forms.length,
      forms,
    });
  } catch (error) {
    console.error("❌ Error fetching available forms:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching available forms",
      error: error.message,
    });
  }
};

// ✅ 2. Get one specific form with questions
const getFormById = async (req, res) => {
  try {
    const form = await FeedbackForm.findById(req.params.id).populate("questions");
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Error fetching form" });
  }
};

// ✅ 3. Submit a feedback response
const submitFeedbackResponse = async (req, res) => {
  try {
    const { formId, teacherId, studentId, answers } = req.body;

    if (!formId || !teacherId || !studentId || !answers || answers.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = new FeedbackResponse({
      formId,
      teacherId,
      studentId,
      answers,
    });

    await response.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

module.exports = { getAvailableForms,
  getFormById,
  submitFeedbackResponse
 };
