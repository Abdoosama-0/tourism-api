const Hotel = require("../models/Hotel");




const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createHotel = async (req, res) => {
  try {
    const { name, location, description, priceRange, rooms } = req.body;
    const hotel = new Hotel({ name, location, description, priceRange, rooms });
    const savedHotel = await hotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const { name, location, description, priceRange, rooms } = req.body;

    hotel.name = name || hotel.name;
    hotel.location = location || hotel.location;
    hotel.description = description || hotel.description;
    hotel.priceRange = priceRange || hotel.priceRange;
    hotel.rooms = rooms !== undefined ? rooms : hotel.rooms;

    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    await hotel.remove();
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const batchCreateHotels = async (req, res) => {
  try {
    const { hotels } = req.body;

    if (!hotels || !Array.isArray(hotels) || hotels.length === 0) {
      return res.status(400).json({ message: "No hotels provided" });
    }

    const createdHotels = await Hotel.insertMany(hotels);

    res.status(201).json({
      message: `${createdHotels.length} hotels created successfully`,
      hotels: createdHotels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  batchCreateHotels,
};
