function randomNum(boardSize) {

    return Math.floor(Math.random() * boardSize);
}

function checkMinePositionExists(positions, newPosition) {
    /*
    Checks if a mine position exists to prevent repeated mine positions.
    */

    if(positions.length > 0) {
        for(let i = 0; i < positions.length; i++) {
            if(positions[i].x === newPosition.x && positions[i].y === newPosition.y) {
                return true;
            }
        }
    }

    return false;
}

function assignMine(minePositions, x, y) {
    /*
    Assigns a mine if the random mine coordinate matches with a coordinate on the board.
    */

    for(let i = 0; i < minePositions.length; i++) {
        if(minePositions[i].x === x && minePositions[i].y === y) {
            return true;
        }
    }

    return false;
}

function getMinePositions(boardSize) {
    /*
    Generates and returns random mine positions.
    */
    
    const positions = [];

    while(positions.length < boardSize) {

        const position = {
            x: randomNum(boardSize),
            y: randomNum(boardSize)
        }

        const minePositionExists = checkMinePositionExists(positions, position);
        if(!minePositionExists) {
            positions.push(position);
        }
    }

    return positions;
}

function createBoard(boardSize) {

    const board = [];
    const minePositions = getMinePositions(boardSize);
    console.log(minePositions);

    for(let x = 0; x < boardSize; x++) {
        const row =[];

        for(let y = 0; y < boardSize; y++) {

            const element = document.createElement("div");
            element.classList.add("hidden");

            const tile = {
                element,
                x,
                y,
                mine: assignMine(minePositions, x, y)
            }

            row.push(tile);
        }

        board.push(row);
    }

    return board;
}

document.addEventListener("DOMContentLoaded", () => {

    const BOARD_SIZE = 10;
    const NUM_OF_MINES = 10;
    
    const canvas = document.getElementById("canvas");

    const board = createBoard(BOARD_SIZE);
    
    board.forEach(row => {
        row.forEach(tile => {
            canvas.append(tile.element);
        })
    })

    console.log(board);
})