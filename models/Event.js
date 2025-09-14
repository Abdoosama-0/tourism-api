const mongoose = require("mongoose") ;
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    speakers: [{ type: String }], 
    date: { type: Date, required: true },
    location: { type: String, required: true },
    eventPrice: { type: Number, required: true } 
  },
  { timestamps: true }
);

module.exports=  mongoose.model("Event", eventSchema);
