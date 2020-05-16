const boardsArray = document.querySelectorAll('.board');

const fillBoard = (boardElement) => {
    const childCount = 40;
    for(let i=0; i<childCount; i++){
        const newChild = document.createElement('div');
        newChild.classList.add('bordered-element');
        newChild.classList.add('board-grid-element');
        boardElement.appendChild(newChild);
    }
}


const buildBoard = () => {
    for(let boardElement of boardsArray){
        fillBoard(boardElement);
    }
}

buildBoard();



