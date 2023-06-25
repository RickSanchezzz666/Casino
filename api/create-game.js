const { Game } = require('../models/game');
const { Router } = require('express')

const router = Router();

router.post('/create', async (req, res) => {
    const { createDate, createdBy, items } = req.body

    const game = new Game({ createDate, createdBy, items })

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