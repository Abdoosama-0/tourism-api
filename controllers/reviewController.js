const Review = require("../models/Review");
const Hotel = require("../models/Hotel");
const Activity = require("../models/Activity");
const Event = require("../models/Event");


const getReviews = async (req, res) => {
  try {
    const { type, itemId } = req.params;

    const reviews = await Review.find({ type, item: itemId })
      .populate("user", "name email");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createReview = async (req, res) => {
  try {
    const { type, item, rating, comment } = req.body;

    
    let existingItem;
    if (type === "hotel") existingItem = await Hotel.findById(item);
    else if (type === "activity") existingItem = await Activity.findById(item);
    else if (type === "event") existingItem = await Event.findById(item);
    else return res.status(400).json({ message: "Invalid type" });

    if (!existingItem) return res.status(404).json({ message: `${type} not found` });

  
    const review = await Review.create({
      user: req.user._id,
      type,
      item,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (req.user.role !== "admin" && review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { rating, comment } = req.body;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (req.user.role !== "admin" && review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
