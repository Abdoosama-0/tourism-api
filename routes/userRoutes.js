const express =  require("express");
const {protect} = require('../middleware/authMiddleware.js')
const {  getProfile } = require("../controllers/userController.js") ;


const router = express.Router();
router.use(protect)

router.get("/profile" ,getProfile);

module.exports= router;
