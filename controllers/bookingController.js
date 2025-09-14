const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const Activity = require("../models/Activity");
const Event = require("../models/Event");

//owner bookings or all bookings for admin
const getBookings = async (req, res) => {
  try {
   
    let filter = {};

    if (req.user.role !== "admin") {
      filter.user = req.user.id;
    }

  
    if (req.query.type) {
      filter.type = req.query.type; 
    }


    if (req.query.status) {
      filter.status = req.query.status;
    }
    const bookings = await Booking.find(filter)
      .populate("user","email name _id")
      .populate("item");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//owner or admin
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "email _id name")
      .populate("item");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

   
    if (req.user.role !== "admin" && booking.user._id.toString() !== req.user.id.toString()) {
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
    if (type === "Hotel") existingItem = await Hotel.findById(item);
    else if (type === "Activity") existingItem = await Activity.findById(item);
    else if (type === "Event") existingItem = await Event.findById(item);
    else return res.status(400).json({ message: "Invalid booking type" });

    if (!existingItem) return res.status(404).json({ message: `${type} not found` });

    const booking = await Booking.create({
      user: req.user.id,
      type,
      item,
    });

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//adminOnly
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

//owner or admin
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role !== "admin" && booking.user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Booking.deleteOne({ _id: booking._id });
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
