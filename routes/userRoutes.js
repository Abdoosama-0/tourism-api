const express = require("express");
const { protect, adminOnly } = require('../middleware/authMiddleware.js')
const {
    getProfile,
    deleteUser,
    getUser,
    getUsers



} = require("../controllers/userController.js");


const router = express.Router();
router.use(protect)

router.delete("/", deleteUser);
router.get("/profile", getProfile);

router.get("/:id", adminOnly,getUser);
router.get("/",adminOnly, getUsers);

module.exports = router;
