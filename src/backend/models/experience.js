const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    image: String,
    price: { type: Number, required: true },
    location: String,
    slots: [
        {
            date: String,
            time: String,
            isBooked: { type: Boolean, default: false }
        }
    ]
}, { timestamps: true })

const Experience = mongoose.model("Experience", experienceSchema)

module.exports = Experience