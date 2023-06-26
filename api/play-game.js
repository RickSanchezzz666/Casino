const { Game } = require('../models/game');
const { Router } = require('express')

const router = Router();

router.get('/play', async (req, res) => {
    const { gameId, tileNumber } = req.query;

    try {
        const game = await Game.findById({ _id: gameId })

        const bombState = game.items[tileNumber].bomb;

        return res.status(200).send(bombState);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

module.exports = {
    router
}