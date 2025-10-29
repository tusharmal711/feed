const mongoose = require("mongoose");

const FeedbackResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeedbackForm",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: true,
  },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      response: {
        type: String,
        enum: ["Good", "Better", "Best", "Bad"],
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FeedbackResponse", FeedbackResponseSchema);
