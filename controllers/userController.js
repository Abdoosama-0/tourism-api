require('dotenv').config()

const User =require('../models/User')

//owner only
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//owner only
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }


    await user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//adminOnly
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//adminOnly
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports={
getProfile,
deleteUser,
getUser,
getUsers

}