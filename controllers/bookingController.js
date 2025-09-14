const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const Activity = require("../models/Activity");
const Event = require("../models/Event");


const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "admin") {
      bookings = await Booking.find().populate("user").populate("item");
    } else {
      bookings = await Booking.find({ user: req.user._id }).populate("item");
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("item");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

   
    if (req.user.role !== "admin" && booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createBooking = async (req, res) => {
  try {
    const { type, item } = req.body;


    let existingItem;
    if (type === "hotel") existingItem = await Hotel.findById(item);
    else if (type === "activity") existingItem = await Activity.findById(item);
    else if (type === "event") existingItem = await Event.findById(item);
    else return res.status(400).json({ message: "Invalid booking type" });

    if (!existingItem) return res.status(404).json({ message: `${type} not found` });

    const booking = await Booking.create({
      user: req.user._id,
      type,
      item,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role !== "admin" && booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await booking.remove();
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
};
