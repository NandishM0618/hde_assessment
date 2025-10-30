const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const dotenv = require("dotenv")

const experienceRoutes = require('./routes/experience')
const bookingRoutes = require('./routes/booking')
const promoRoutes = require('./routes/promo')

dotenv.config()

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Mongodb connected")).catch(() => console.log("Failed to connect database"))

app.use("/experieneces", experienceRoutes);
app.use("/bookings", bookingRoutes)
app.use("/promo", promoRoutes)

app.listen(8080, () => console.log("Listening on port 8080"))