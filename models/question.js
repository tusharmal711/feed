const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // actual question text
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
