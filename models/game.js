const { Schema, model, mongo, default: mongoose } = require('mongoose');

const schema = new Schema({
    createDate: { type: String, required: true },
    createdBy: { type: String, required: true },
    bombsNumber: { type: Number, required: true },
    opened: [{ type: Number }],
    bombs: [{ type: Number }],
    crystals: [{ type: Number }],
    active: { type: Number, required: true },
    state: { type: String, required: true },
    bet: { type: Number, required: true },
    profit: { type: Number, required: true },
    multiplier: { type: Number, required: true }
})

const Game = new model('game', schema, 'game');

module.exports = {
    Game
}