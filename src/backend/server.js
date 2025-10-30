const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv")

const experienceRoutes = require('./routes/experience')
const bookingRoutes = require('./routes/booking')
const promoRoutes = require('./routes/promo')

dotenv.config()

const app = express();

app.use(cors({
    origin: 'https://hde-assessment-rnbo.vercel.app',
    methods: ['GET', 'POST'],
}));

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Mongodb connected")).catch(() => console.log("Failed to connect database"))

app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes)
app.use("/promo", promoRoutes)

app.listen(8080, () => console.log("Listening on port 8080"))