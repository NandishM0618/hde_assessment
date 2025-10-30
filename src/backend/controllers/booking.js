const Booking = require('../models/booking')
const Experience = require('../models/experience')

async function createBooking(req, res) {
    try {
        const { experienceId, customerName, customerEmail, date, time, qty, subtotal, tax, price, promoCode } = req.body;

        const exp = await Experience.findOne({
            _id: experienceId,
            slots: { $elemMatch: { date, time, isBooked: true } }
        });

        if (exp) {
            return res.status(400).json({ message: "Slot already booked" });
        }

        const booking = await Booking.create({
            experienceId, customerName, customerEmail, date, time, qty, subtotal, tax, price, promoCode
        });

        await Experience.updateOne(
            { _id: experienceId, "slots.date": date, "slots.time": time },
            { $set: { "slots.$.isBooked": true } }
        );

        res.status(200).json({ message: "Booking successful", booking });
    } catch (error) {
        console.log(error);
    }
}

async function getBooking(req, res) {
    try {
        const booking = await Booking.findById(req.params.id).populate("experienceId");
        res.status(200).json({ message: "Fetch Success", booking })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createBooking, getBooking
}