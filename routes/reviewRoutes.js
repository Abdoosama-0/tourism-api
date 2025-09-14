const express = require("express");
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getReview
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:type/:itemId", getReviews);
router.get("/:id", getReview);


router.post("/", protect, createReview);


router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
