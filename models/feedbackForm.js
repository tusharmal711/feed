const mongoose = require("mongoose");

const FeedbackFormSchema = new mongoose.Schema({
  emailId: {
    type:String , 
    required: true,
  },
  formTitle: { type: String, required: true },
  courseName: { type: String, required: true },
  semester: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FeedbackForm", FeedbackFormSchema);
