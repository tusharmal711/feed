const FeedbackForm = require("../models/feedbackForm");

// Create new feedback form
const createFeedbackForm = async (req, res) => {
  try {
    const {
      teacherId,
      description,
      department,
      semester,
      section,
      questionIds,
    } = req.body;

    const form = new FeedbackForm({
      teacher: teacherId,
      description,
      department,
      semester,
      section,
      questions: questionIds,
    });

    await form.save();

    const savedForm = await FeedbackForm.findById(form._id)
      .populate("teacher")
      .populate("questions");

    res.status(201).json({
      message: "Feedback form created successfully",
      form: savedForm,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get forms for a specific teacher
const getFormByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const forms = await FeedbackForm.find({ teacher: teacherId })
      .populate("teacher")
      .populate("questions");

    if (!forms || forms.length === 0) {
      return res
        .status(404)
        .json({ message: "No forms found for this teacher" });
    }

    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createFeedbackForm, getFormByTeacher };
