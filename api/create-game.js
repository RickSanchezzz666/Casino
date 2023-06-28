const { Game } = require('../models/game');
const { Router } = require('express')

const router = Router();

router.post('/create', async (req, res) => {
    const { createDate, createdBy, bombsNumber } = req.body

    const game = new Game({ createDate, createdBy, bombsNumber, opened: [], bombs: [], crystals: [], active: 1, state: "game in progress..." })

    try {
        const doc = await game.save();
        return res.status(200).send(doc);
    } catch (error) {
        res.status(400).send({ message: `Something went wrong. Error: ${error}` })
    }
})

module.exports = {
    router
}