const mongoose = require("mongoose");

const FeedbackFormSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const FeedbackForm = mongoose.model("FeedbackForm", FeedbackFormSchema);
module.exports = FeedbackForm;
