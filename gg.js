let bombsNumber = 2;

let openedTiles = 4;

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

console.log(chanceBoost)
console.log(boost)
console.log(multiply)

console.log(minRange + chanceBoost)
console.log(maxRange - chanceBoost)