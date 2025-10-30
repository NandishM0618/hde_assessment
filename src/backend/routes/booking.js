const { createBooking, getBooking } = require('../controllers/booking')

const router = require('express').Router()

router.post("/", createBooking);
router.get("/:id", getBooking);

module.exports = router