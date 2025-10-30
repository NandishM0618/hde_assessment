const router = require('express').Router()

router.post("/validate", (req, res) => {
    try {
        const { code } = req.body;

        const promos = {
            SAVE10: { type: "percent", value: 10 },
            FLAT100: { type: "flat", value: 100 }
        }

        if (!promos[code]) {
            return res.status(400).json({ valid: false, message: "Invalid code" });
        }

        res.status(200).json({ vaild: true, ...promos[code] })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router