const { Game } = require('../models/game');
const { Router } = require('express')

const router = Router();

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

router.post('/play', async (req, res) => {
    const { gameId, tileNumber, bombsNumber } = req.body;

    try {
        let randomNum = randomIntFromInterval(0, 999999);

        console.log(randomNum)

        if (randomNum <= 100000 || randomNum >= 899999) {
            const game = await Game.findById({ _id: gameId })

            let openedTiles = [];

            game.opened.map((tile) => {
                openedTiles.push(tile)
            })

            let lostTile = tileNumber;

            let bombsTiles = [];

            let crystalTiles = [];

            bombsTiles.push(lostTile)

            function randomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            while (bombsTiles.length < bombsNumber) {
                const random = randomInt(0, 24);

                if (bombsTiles.indexOf(random) === -1 && openedTiles.indexOf(random) === -1) {
                    bombsTiles.push(random);
                }
            }

            for (let i = 0; i <= 24; i++) {
                crystalTiles.push(i);
            }

            for (let i = 0; i < bombsNumber; i++) {
                let index = crystalTiles.indexOf(bombsTiles[i]);
                if (index > -1) {
                    crystalTiles.splice(index, 1);
                }
            }

            const doc = await Game.findOneAndUpdate(
                { _id: gameId },
                {
                    $push: { bombs: bombsTiles, crystals: crystalTiles },
                    $set: { active: 0, state: "defeat" }
                },
                { returnOriginal: false }
            )

            bombsTiles = [];
            crystalTiles = [];

            return res.status(200).send(doc);
        } else {
            await Game.findOneAndUpdate({ _id: gameId }, { $push: { opened: tileNumber } }, { returnOriginal: false });

            const game = await Game.findById({ _id: gameId })

            let openedTiles = [];

            game.opened.map((tile) => {
                openedTiles.push(tile)
            })

            let bombsTiles = [];

            let crystalTiles = [];

            if (openedTiles.length === 25 - bombsNumber) {
                function randomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min)
                }

                while (bombsTiles.length < bombsNumber) {
                    const random = randomInt(0, 24);

                    if (bombsTiles.indexOf(random) === -1 && openedTiles.indexOf(random) === -1) {
                        bombsTiles.push(random);
                    }
                }

                for (let i = 0; i <= 24; i++) {
                    crystalTiles.push(i);
                }

                for (let i = 0; i < bombsNumber; i++) {
                    let index = crystalTiles.indexOf(bombsTiles[i]);
                    if (index > -1) {
                        crystalTiles.splice(index, 1);
                    }
                }

                const doc = await Game.findOneAndUpdate(
                    { _id: gameId },
                    {
                        $push: { bombs: bombsTiles, crystals: crystalTiles },
                        $set: { active: 0, state: "victory" }
                    },
                    { returnOriginal: false }
                )

                bombsTiles = [];
                crystalTiles = [];

                return res.status(200).send(doc);
            }
            else {
                return res.status(200).send(true);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

module.exports = {
    router
}