const express = require("express");
const {
  getAvailableForms,
  getFormById,
  submitFeedbackResponse,
} = require("../controllers/feedbackResponseController");



const router = express.Router();
router.post("/getAvailableForms",getAvailableForms);
router.post("/submitFeedbackResponse",submitFeedbackResponse);

module.exports = router;
