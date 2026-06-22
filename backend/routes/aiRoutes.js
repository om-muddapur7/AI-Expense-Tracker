const express = require('express');
const { getAIInsights } = require("../controllers/aiController.js");
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

router.get(
  "/insights",
  protect,
  getAIInsights
);

module.exports = router;