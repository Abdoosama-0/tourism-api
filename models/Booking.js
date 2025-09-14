const mongoose = require("mongoose") ;
const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["Hotel", "Activity", "Event"],
      required: true,
    },
    item: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      refPath: "type" 
    },
    bookingDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports=  mongoose.model("Booking", bookingSchema);
