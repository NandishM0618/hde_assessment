const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    experienceId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Experience"
    },
    customerName: String,
    customerEmail: String,
    qty: Number,
    subtotal: Number,
    tax: Number,
    date: String,
    time: String,
    price: Number,
    promoCode: String,
    status: { type: String, default: "confirmed" }
}, { timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking