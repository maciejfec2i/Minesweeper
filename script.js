
function createBoard(boardSize) {

    const board = [];

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

    const canvas = document.getElementById("canvas");

    const board = createBoard(10);
    
    board.forEach(row => {
        row.forEach(tile => {
            canvas.append(tile.element);
        })
    })
})