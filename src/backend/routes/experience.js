const { getExperience, getExperienceById } = require('../controllers/experience')

const router = require('express').Router()

router.get("/", getExperience);
router.get("/:id", getExperienceById);

module.exports = router