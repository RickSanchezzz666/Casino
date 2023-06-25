const { Schema, model, mongo, default: mongoose } = require('mongoose');

const schema = new Schema({
    createDate: { type: String, required: true },
    createdBy: { type: String, required: true },
    items: [{
        bomb: { type: Boolean, required: true }
    }]
})

const Game = new model('game', schema, 'game');

module.exports = {
    Game
}