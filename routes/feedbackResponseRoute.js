const express = require("express");
const { submitFeedback } = require("../controllers/feedbackResponseController");

const router = express.Router();

router.post("/submit", submitFeedback);

module.exports = router;
