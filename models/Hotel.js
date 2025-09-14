const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    description: { type: String },
    roomPrice: { type: Number, required: true }, 
    rooms: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
