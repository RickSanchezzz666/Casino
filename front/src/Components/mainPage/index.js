import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import './style.css';

function MainPage() {

    useEffect(() => {
        for (let i = 0; i <= 24; i++) {
            let tile = document.getElementById(`tile${i}`);
            tile.className = 'tile';
            tile.disabled = true;
        }
    }, [])

    let [bombsNumber, setBombsNumber] = useState("");
    let [gameId, setGameId] = useState("");
    let [gameInfo, setGameInfo] = useState("")
    let [activeGame, setActiveGame] = useState(false)
    let tilesWon = [];
    let tilesOpened = [];

    async function createGame() {
        if(activeGame === true) {
            console.error('You already have your game started!');
            return;
        }

        if (bombsNumber === "") {
            console.log('Firstly choose bombs number!')
            return;
        }

        tilesWon = [];

        for (let i = 0; i <= 24; i++) {
            let tile = document.getElementById(`tile${i}`);
            tile.className = 'tile';
            tile.disabled = false;
        }

        setActiveGame(false)

        document.getElementById('winner-text').className = 'display-none';

        const createdBy = 'Roman Lapiyk';

        let bombs = [];

        let slots = [];

        for (let i = 1; i <= 25; i++) {
            let newItem = {
                bomb: false
            };

            slots.push(newItem);
        }

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        for (let i = 1; i <= bombsNumber; i++) {
            const random = randomIntFromInterval(0, 24)
            bombs.push(random);
        }

        for (let i = 0; i < bombsNumber; i++) {
            let tempBomb = 0;
            tempBomb = bombs[i];
            if (slots[tempBomb].bomb === true) {
                const random = randomIntFromInterval(0, 24)
                bombs.push(random);
                bombsNumber++;
            } else {
                slots[tempBomb].bomb = true;
            }
        }

        try {
            const res = await axios.post("/create", {
                createDate: moment(Date.now()).format(),
                createdBy,
                items: slots
            })

            setGameId(res.data._id)
            setGameInfo(res.data)
            return;
        } catch (error) {
            return [];
        }
    }

    async function PlayGame(tileNumber) {
        let tile = document.getElementById(`tile${tileNumber}`);

        setActiveGame(true);

        try {
            const res = await axios.get("/play", {
                params: {
                    gameId,
                    tileNumber
                }
            })

            if (res.data === false) {
                console.log(`Tile ${tileNumber} is clear!`)
                tilesWon.push(tileNumber);
                tile.className = 'tile-won';
                tile.disabled = true;
            }
            else {
                console.log(`Tile ${tileNumber} has a bomb. You lost!`)
                setActiveGame(false);
                for (let i = 0; i <= 24; i++) {
                    let tiles = document.getElementById(`tile${i}`);
                    tiles.disabled = true;
                }
                for(let i = 0; i <= 24; i++) {
                    let tileLost = document.getElementById(`tile${i}`);
                    if(gameInfo.items[i].bomb === false) {
                        tileLost.className = 'tile-win';
                    } else if(gameInfo.items[i].bomb === true) {
                        tileLost.className = 'tile-lost';
                    }
                }
                tile.className = 'tile-loose';
                tilesWon.map((tile) => {
                    let tileWon = document.getElementById(`tile${tile}`);
                    tileWon.className = 'tile-won';
                })
            }

            if(25 - bombsNumber === tilesWon.length) {
                console.log(`You opened every correct tile. You won!`)
                for (let i = 0; i <= 24; i++) {
                    let tiles = document.getElementById(`tile${i}`);
                    tiles.disabled = true;
                }
                for(let i = 0; i <= 24; i++) {
                    let tileLost = document.getElementById(`tile${i}`);
                    if(gameInfo.items[i].bomb === false) {
                        tileLost.className = 'tile-win';
                    } else if(gameInfo.items[i].bomb === true) {
                        tileLost.className = 'tile-lost';
                    }
                }
                tilesWon.map((tile) => {
                    let tileWon = document.getElementById(`tile${tile}`);
                    tileWon.className = 'tile-won';
                })
                document.getElementById('winner-text').className = '';
            }

            return res.data;
        } catch (error) {
            return [];
        }
    }

    return (
        <div className="main-page">
            <div className="game-wrapper">
                <span id="winner-text" className="display-none">You won the Game!</span>
                <div className="game-field-wrapper">
                    <button id="tile0" onClick={() => {
                        PlayGame(0)
                    }} className="tile"></button>
                    <button id="tile1" onClick={() => {
                        PlayGame(1)
                    }} className="tile"></button>
                    <button id="tile2" onClick={() => {
                        PlayGame(2)
                    }} className="tile"></button>
                    <button id="tile3" onClick={() => {
                        PlayGame(3)
                    }} className="tile"></button>
                    <button id="tile4" onClick={() => {
                        PlayGame(4)
                    }} className="tile"></button>
                    <button id="tile5" onClick={() => {
                        PlayGame(5)
                    }} className="tile"></button>
                    <button id="tile6" onClick={() => {
                        PlayGame(6)
                    }} className="tile"></button>
                    <button id="tile7" onClick={() => {
                        PlayGame(7)
                    }} className="tile"></button>
                    <button id="tile8" onClick={() => {
                        PlayGame(8)
                    }} className="tile"></button>
                    <button id="tile9" onClick={() => {
                        PlayGame(9)
                    }} className="tile"></button>
                    <button id="tile10" onClick={() => {
                        PlayGame(10)
                    }} className="tile"></button>
                    <button id="tile11" onClick={() => {
                        PlayGame(11)
                    }} className="tile"></button>
                    <button id="tile12" onClick={() => {
                        PlayGame(12)
                    }} className="tile"></button>
                    <button id="tile13" onClick={() => {
                        PlayGame(13)
                    }} className="tile"></button>
                    <button id="tile14" onClick={() => {
                        PlayGame(14)
                    }} className="tile"></button>
                    <button id="tile15" onClick={() => {
                        PlayGame(15)
                    }} className="tile"></button>
                    <button id="tile16" onClick={() => {
                        PlayGame(16)
                    }} className="tile"></button>
                    <button id="tile17" onClick={() => {
                        PlayGame(17)
                    }} className="tile"></button>
                    <button id="tile18" onClick={() => {
                        PlayGame(18)
                    }} className="tile"></button>
                    <button id="tile19" onClick={() => {
                        PlayGame(19)
                    }} className="tile"></button>
                    <button id="tile20" onClick={() => {
                        PlayGame(20)
                    }} className="tile"></button>
                    <button id="tile21" onClick={() => {
                        PlayGame(21)
                    }} className="tile"></button>
                    <button id="tile22" onClick={() => {
                        PlayGame(22)
                    }} className="tile"></button>
                    <button id="tile23" onClick={() => {
                        PlayGame(23)
                    }} className="tile"></button>
                    <button id="tile24" onClick={() => {
                        PlayGame(24)
                    }} className="tile"></button>
                </div>
                <div className="buttons-wrapper">
                    <select className="choose-bombs-number" value={bombsNumber} onChange={(event) => setBombsNumber(event.target.value)} >
                        <option value="">-</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </select>
                    <button className="start-button" onClick={createGame}>Start</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage;