const express = require("express");
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:type/:itemId", getReviews);


router.post("/", protect, createReview);


router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
