const mongoose = require("mongoose") ;
const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports=  mongoose.model("Activity", activitySchema);
