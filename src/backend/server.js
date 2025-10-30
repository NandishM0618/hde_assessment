const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const dotenv = require("dotenv")

dotenv.config()

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Mongodb connected")).catch(() => console.log("Failed to connect database"))


app.listen(8080, () => console.log("Listening on port 8080"))