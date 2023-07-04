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
    let [activeGame, setActiveGame] = useState("")
    let [bet, setBet] = useState("")

    async function createGame() {
        if (activeGame === 1) {
            console.error('You already have your game started!');
            return;
        }

        if(bet === '') {
            console.log('Firstly enter the bet!')
            return;
        }

        if (bombsNumber === "") {
            console.log('Firstly choose bombs number!')
            return;
        }

        for (let i = 0; i <= 24; i++) {
            let tile = document.getElementById(`tile${i}`);
            tile.className = 'tile';
            tile.disabled = false;
        }

        document.getElementById('winner-text').className = 'display-none';

        const createdBy = 'Roman Lapiyk';

        try {
            const res = await axios.post("/create", {
                createDate: moment(Date.now()).format(),
                createdBy,
                bombsNumber,
                bet: (bet * 100)
            })

            setGameId(res.data._id)
            setActiveGame(res.data.active);
            return;
        } catch (error) {
            return [];
        }
    }

    async function PlayGame(tileNumber) {
        let tile = document.getElementById(`tile${tileNumber}`);

        try {
            const res = await axios.post("/play", {
                gameId,
                tileNumber,
                bombsNumber
            })

            if (res.data === true) {
                console.log(`Tile ${tileNumber} is clear!`)
                tile.className = 'tile-won';
                tile.disabled = true;
            } else {
                setActiveGame(res.data.active)
                if (res.data.state === "victory") {
                    console.log(`You opened every correct tile. You won!`)
                    for (let i = 0; i <= 24; i++) {
                        let tiles = document.getElementById(`tile${i}`);
                        tiles.disabled = true;
                    }
                    document.getElementById('winner-text').className = '';
                } else {
                    console.log(`Tile ${tileNumber} has a bomb. You lost!`)
                }

                for (let i = 0; i <= 24; i++) {
                    let tiles = document.getElementById(`tile${i}`);
                    tiles.disabled = true;
                }

                res.data.crystals.map((crystal) => {
                    let tileWin = document.getElementById(`tile${crystal}`);
                    tileWin.className = 'tile-win';
                })
                res.data.bombs.map((bomb) => {
                    let tileLost = document.getElementById(`tile${bomb}`);
                    tileLost.className = 'tile-lost';
                })
                tile.className = 'tile-loose';
                res.data.opened.map((tile) => {
                    let tileWon = document.getElementById(`tile${tile}`);
                    tileWon.className = 'tile-won';
                })
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
                    <input value={"0.00"} onChange={(event) => setBet(event.target.value)} className="bet-input"></input>
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