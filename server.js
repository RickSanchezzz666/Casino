const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT_BACK;

console.log(`PORT: ${PORT}`)
console.log(`MONGO_DB_URI: ${process.env.MONGO_DB_URI}`)

const Mongo = require('./setup/mongoose')

const app = express();

const gameApi = require('./api/create-game')

app.use(bodyParser.json());
app.use(cors())


const setup = async () => {

    const buildPath = path.join(__dirname, "./front/build");

    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, "index.html"))
    })

    app.get('*.js', (req, res) => {
        res.set('Content-Type', 'application/javascript');
      });

    app.use(gameApi.router);

    await Mongo.setupDb(process.env.MONGO_DB_URI);

    app.listen(PORT, () => {
        console.log(`Server was started on ${PORT} PORT`)
    })
}

setup();