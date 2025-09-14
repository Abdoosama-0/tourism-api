//============================Dependencies===============================
const express = require('express');
const cookieParser = require('cookie-parser')

require('./config/db')
const cors = require('cors');
const app = express();

//========================Global Middleware===============================
app.use(cookieParser());


app.use(cors({
      origin: (origin, callback) => {
    callback(null, true); // accept any origin
  },
    credentials: true,
  }));

app.use(express.json()) 

//=======================Route Handlers========================
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/auth",authRoutes );
app.use("/api/user",userRoutes );
app.use("/api/activity", activityRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/booking", bookingRoutes);

//=======================Basic Route========================

app.get('/', (req, res) => {
    res.status(200).json({message:'Hello, World!'});
});

//test server errors
app.get('/error', (req, res,next) => {
    try{
   const x=2
   x=1
    res.json({message:x});
}catch(err){
    next(err)
}
});
//================================ error handler middleware=============================
require('./Middleware/errorMiddleware')(app)
// ==================== Start Server ====================
const PORT = process.env.Server_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});