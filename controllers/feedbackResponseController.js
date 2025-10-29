const FeedbackResponse = require("../models/feedbackResponse");

const submitFeedback = async (req, res) => {
  try {
    const { formId, teacherId, studentId, answers } = req.body;

    const response = new FeedbackResponse({
      formId,
      teacherId,
      studentId,
      answers,
    });
    await response.save();

    res
      .status(201)
      .json({ message: "Feedback submitted successfully", response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { submitFeedback };
