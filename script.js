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

function getMinePositions(boardSize, numOfMines) {
    /*
    Generates and returns random mine positions.
    */
    
    const positions = [];

    while(positions.length < numOfMines) {

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
    const minePositions = getMinePositions(boardSize, numOfMines);

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

function flagTile(tile, numOfFlags) {

    if(tile.element.classList.contains("hidden")) {
        if(numOfFlags > 0) {
            tile.element.classList.remove("hidden");
            tile.element.classList.add("flag");
            return "flag";
        }
    }
    
    if(tile.element.classList.contains("flag")) {
        tile.element.classList.remove("flag");
        tile.element.classList.add("hidden");

        return "hidden";
    }
}

function clearTileClassList(tile) {

    while(tile.element.classList.length > 0) {
        tile.element.classList.remove(tile.element.classList.item(0));
    }
}

function showTile(tile) {

    if(!tile.element.classList.contains("hidden")) {
        return;
    }
    
    if(tile.mine) {
       clearTileClassList(tile);
       tile.element.classList.add("mine");
       return;
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const BOARD_SIZE = 10;
    const NUM_OF_MINES = 10;
    let NUM_OF_FLAGS = NUM_OF_MINES;
    
    const canvas = document.getElementById("canvas");

    const board = createBoard(BOARD_SIZE, NUM_OF_MINES);
    
    board.forEach(row => {
        row.forEach(tile => {
            canvas.append(tile.element);

            tile.element.addEventListener("click", (event) => {
                showTile(tile);
            })
            
            tile.element.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                
                let flagStatus = flagTile(tile, NUM_OF_FLAGS);
                if(flagStatus === "flag") {
                    NUM_OF_FLAGS--;
                }
                if(flagStatus === "hidden") {
                    NUM_OF_FLAGS++;
                }
            })
        })
    })

    canvas.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })

    console.log(board);
})