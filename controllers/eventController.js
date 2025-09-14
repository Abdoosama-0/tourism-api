const Event = require("../models/Event");




const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//adminOnly
const batchCreateEvents = async (req, res) => {
  try {
    const { events } = req.body;

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ message: "No events provided" });
    }

  
    const createdEvents = await Event.insertMany(events);

    res.status(201).json({
      message: `${createdEvents.length} events created successfully`,
      events: createdEvents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//adminOnly
const createEvent = async (req, res) => {
  try {
    const { title, description, speakers, date, location,eventPrice } = req.body;
    const event = new Event({ title, description, speakers, date, location,eventPrice });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//adminOnly
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { title, description, speakers, date, location,eventPrice } = req.body;

    event.title = title || event.title;
    event.eventPrice = eventPrice || eventPrice;
    event.description = description || event.description;
    event.speakers = speakers || event.speakers;
    event.date = date || event.date;
    event.location = location || event.location;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//adminOnly
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await Event.deleteOne({ _id: event._id });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  batchCreateEvents
};
