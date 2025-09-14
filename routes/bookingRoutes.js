const express = require("express");
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getBookings); 
router.get("/:id", protect, getBookingById);
router.post("/", protect, createBooking);
router.put("/:id/status", protect, adminOnly, updateBookingStatus); 
router.delete("/:id", protect, deleteBooking);

module.exports = router;
