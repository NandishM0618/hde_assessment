const Experince = require("../models/experience")

async function getExperience(req, res) {
    try {
        const data = await Experince.find();
        res.status(200).json({ message: "Fetched Successfull", data })
    } catch (error) {
        console.log(error);
    }
}

async function getExperienceById(req, res) {
    try {
        const data = await Experince.findById(req.params.id);
        res.status(200).json({ message: "Fetch Success", data });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getExperience,
    getExperienceById
}