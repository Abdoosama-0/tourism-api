const express = require("express");
const {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  batchCreateHotels,
} = require("../controllers/hotelController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", getHotels);
router.get("/:id", getHotelById);


router.post("/", protect, adminOnly, createHotel);
router.put("/:id", protect, adminOnly, updateHotel);
router.delete("/:id", protect, adminOnly, deleteHotel);


router.post("/batchCreateHotels", protect, adminOnly, batchCreateHotels);

module.exports = router;
