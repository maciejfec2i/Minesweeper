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
    /*
    Places or removes a flag based on user choice.
    */

    if(tile.element.classList.contains("hidden")) {
        if(numOfFlags > 0) {
            tile.element.classList.remove("hidden");
            tile.element.classList.add("flag");
            tile.element.innerHTML = '<img src="./img/flag.svg">';
            
            return "flag";
        }
    }
    
    if(tile.element.classList.contains("flag")) {
        tile.element.classList.remove("flag");
        tile.element.classList.add("hidden");
        tile.element.innerHTML = '';

        return "hidden";
    }
}

function clearTileClassList(tile) {
    /*
    Clears the tiles styling.
    */

    tile.element.classList.remove(tile.element.classList.item(0));
}

function getMinedTiles(adjacentTiles) {

    const minedTiles = [];

    adjacentTiles.forEach((tile) => {

        if(tile.mine) {
            minedTiles.push(tile);
        }
    })

    return minedTiles;
}

function getAdjacentTiles(board, tile) {
    /*
    Grabs the tiles adjacent to the clicked tile.
    */

    const tiles = [];
    
    for(let x = -1; x <= 1; x++) {
        for(let y = -1; y <= 1; y++) {
            
            const validRow = board.includes(board[tile.x + x]);
            
            if(validRow) {
                const validCol = board[tile.x + x].includes(board[tile.x + x][tile.y + y]);
                
                if(validCol) {
                    const validTile = board[tile.x + x][tile.y + y];
                    tiles.push(validTile);
                }
            }
        }
    }

    return tiles;
}

function showTile(board, tile) {

    if(!tile.element.classList.contains("hidden")) {
        return;
    }
    
    if(tile.mine) {
       clearTileClassList(tile);
       tile.element.classList.add("mine");
       tile.element.innerHTML = '<img src="./img/bomb.svg">';
       return "mine";
    }

    clearTileClassList(tile);
    tile.element.classList.add("revealed");
        
    let adjacentTiles = getAdjacentTiles(board, tile);
    let minedTiles = getMinedTiles(adjacentTiles);
    let numOfMinesByTile = minedTiles.length;
        
    if(numOfMinesByTile > 0) {
        tile.element.innerHTML = numOfMinesByTile;
    }
    else if(numOfMinesByTile === 0) {
        adjacentTiles.forEach((tile) => {
            showTile(board, tile);
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const BOARD_SIZE = 10;
    const NUM_OF_MINES = 10;
    let NUM_OF_FLAGS = NUM_OF_MINES;
    let gameOver = false;
    
    const canvas = document.getElementById("canvas");

    const board = createBoard(BOARD_SIZE, NUM_OF_MINES);
    
    board.forEach(row => {
        row.forEach(tile => {
            canvas.append(tile.element);
            
            tile.element.addEventListener("click", () => {
                
                if(!gameOver) {
                    let result = showTile(board, tile);

                    if(result === "mine") {
                        gameOver = true;

                    }
                    
                    if(gameOver) {
                        board.forEach(row => {
                            row.forEach(tile => {
                                showTile(board, tile);
                            })
                        })
                    }
                }
            })
                
            tile.element.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                    
                if(!gameOver) {
                    let flagStatus = flagTile(tile, NUM_OF_FLAGS);
                
                    if(flagStatus === "flag") {
                        NUM_OF_FLAGS--;
                    }
                    if(flagStatus === "hidden") {
                        NUM_OF_FLAGS++;
                    }
                }
            })

        })
    })

    canvas.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })
})