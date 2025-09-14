const express = require("express");
const {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  batchCreateActivities
} = require("../controllers/activityController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getActivities); 
router.get("/:id", getActivityById);

router.post("/batchCreateActivities", protect, adminOnly, batchCreateActivities);
router.post("/", protect, adminOnly, createActivity);
router.put("/:id", protect, adminOnly, updateActivity);
router.delete("/:id", protect, adminOnly, deleteActivity);



module.exports = router;
