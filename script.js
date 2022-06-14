function randomNum(boardSize) {

    return Math.floor(Math.random() * boardSize);
}

function checkMinePositionExists(positions, newPosition) {

    if(positions.length > 0) {
        for(let i = 0; i < positions.length; i++) {
            if(positions[i].x === newPosition.x && positions[i].y === newPosition.y) {
                return true;
            }
        }
    }

    return false;
}

function getMinePositions(boardSize) {
    
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

function createBoard(boardSize, numOfMines) {

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
                y
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

    const board = createBoard(BOARD_SIZE, NUM_OF_MINES);
    
    board.forEach(row => {
        row.forEach(tile => {
            canvas.append(tile.element);
        })
    })
})