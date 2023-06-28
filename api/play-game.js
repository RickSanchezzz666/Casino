const { Game } = require('../models/game');
const { Router } = require('express')

const router = Router();

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

router.post('/play', async (req, res) => {
    const { gameId, tileNumber, bombsNumber } = req.body;

    let openedTiles;

    try {
        const gameData = await Game.findById({ _id: gameId })
        openedTiles = gameData.opened.length
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }

    let rangeBoost = 1;

    let boost = 1;
    let multiply = 1.25;

    if (bombsNumber >= 2 && bombsNumber <= 3) {
        boost = 1.30;
        rangeBoost = 1.025
        if (openedTiles >= 3 && openedTiles <= 8) {
            multiply = 2.5;
        } else if (openedTiles >= 9 && openedTiles <= 16) {
            multiply = 3;
        } else if (openedTiles >= 16 && openedTiles <= 22) {
            multiply = 5;
        }
    }
    else if (bombsNumber >= 8 && bombsNumber <= 13) {
        boost = 1.4;
        rangeBoost = 1.035
        if (openedTiles >= 3 && openedTiles <= 8) {
            multiply = 3;
        } else if (openedTiles >= 9 && openedTiles <= 16) {
            multiply = 4;
        } else if (openedTiles >= 16 && openedTiles <= 22) {
            multiply = 5;
        }
    } else if (bombsNumber >= 8 && bombsNumber <= 13) {
        boost = 1.75;
        rangeBoost = 1.05
        if (openedTiles >= 2 && openedTiles <= 7) {
            multiply = 5;
        } else if (openedTiles >= 8 && openedTiles <= 12) {
            multiply = 8;
        } else if (openedTiles >= 13 && openedTiles <= 16) {
            multiply = 12;
        }
    } else if (bombsNumber >= 14 && bombsNumber <= 19) {
        boost = 2.
        rangeBoost = 1.075
        if (openedTiles >= 0 && openedTiles <= 2) {
            multiply = 7;
        } else if (openedTiles >= 3 && openedTiles <= 4) {
            multiply = 8;
        } else if (openedTiles >= 5 && openedTiles <= 9) {
            multiply = 9;
        }
    } else if (bombsNumber >= 20 && bombsNumber <= 23) {
        boost = 2.25;
        rangeBoost = 1.075
        if (openedTiles === 1) {
            multiply = 1;
        } else if (openedTiles === 2) {
            multiply = 4.5;
        } else if (openedTiles === 3) {
            multiply = 7;
        }
    }

    let minRange = (30000 + (bombsNumber * 15745) * 1.16465) * rangeBoost

    let maxRange = (999999 - (30000 + (bombsNumber * 15745) * 1.16465))

    let chanceBoost = (2500 * (multiply * openedTiles) * 0.389) * boost;

    try {
        let randomNum = randomIntFromInterval(0, 999999);

        console.log(randomNum)

        if (randomNum <= minRange + chanceBoost || randomNum >= maxRange - chanceBoost) {
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