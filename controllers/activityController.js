const Activity = require("../models/Activity");


const batchCreateActivities = async (req, res) => {
  try {
    const { activities } = req.body; 

    if (!activities || !Array.isArray(activities) || activities.length === 0) {
      return res.status(400).json({ message: "No activities provided" });
    }


    const createdActivities = await Activity.insertMany(activities);

    res.status(201).json({
      message: `${createdActivities.length} activities created successfully`,
      activities: createdActivities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createActivity = async (req, res) => {
  try {
    const { title, description, location, date, price } = req.body;
    const activity = new Activity({ title, description, location, date, price });
    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    const { title, description, location, date, price } = req.body;

    activity.title = title || activity.title;
    activity.description = description || activity.description;
    activity.location = location || activity.location;
    activity.date = date || activity.date;
    activity.price = price !== undefined ? price : activity.price;

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    await activity.remove();
    res.json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  batchCreateActivities
};
