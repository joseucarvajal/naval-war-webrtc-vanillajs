const boardsArray = document.querySelectorAll('.board');

const fillBoard = (boardElement) => {

    let column = 0;
    let row = 0; //fila

    const childCount = 100;    
    for (let i = 0; i < childCount; i++) {        
        const newChild = document.createElement('div');

        if(i !== 0 && column % 10 === 0){
            column = 0;
            row++;
        }

        newChild.setAttribute('x', column);
        newChild.setAttribute('y', row);

        column++;
        
        newChild.classList.add('bordered-element');
        newChild.classList.add('board-grid-element');        
        boardElement.appendChild(newChild);
    }

}

const buildBoard = () => {

    for (let boardElement of boardsArray) {
        fillBoard(boardElement);
    }

    const gridElements = document.querySelectorAll('.board-grid-element');
    for (let gridElement of gridElements) {
        gridElement.addEventListener('click', (e)=>{    
            
            if(selectedChip === 0){
                alert('Primero seleccione un barco');
                return;
            }

            const x = +e.target.getAttribute('x');
            let y = +e.target.getAttribute('y');            
            for(let i=0; i<selectedChip; i++){
                const coords = `[y="${y}"][x="${x}"]`;
                const gridElement = document.querySelector(coords);
                gridElement.classList.add('board-grid-element--barco');
                y++;
            }

            const selectedChipElement = document.querySelector(`[chip="${selectedChip}"]`);
            selectedChipElement.setAttribute('activo', 0);
            selectedChipElement.classList.add('game-controls-chip__opt--inactivo');
        });
    }
}

buildBoard();


let selectedChip = 0; //5, 4, 3, 2
const chipSelectors = document.querySelectorAll('.game-controls-chip__opt');
for(let chipSelector of chipSelectors){
    chipSelector.addEventListener('click', (e)=>{
        if(+e.target.getAttribute('activo') === 0){
            alert(`The selected chip ${e.target.getAttribute('chip')} has already been selected`);
            selectedChip = 0;
            return;
        }
        e.target.classList.add('game-controls-chip__opt--activo');
        selectedChip = +e.target.getAttribute('chip');
    });
}

