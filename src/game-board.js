import { showErrorMessage } from "./messages-controller";

const boardsArray = document.querySelectorAll('.board');

const fillBoard = (boardElement, playerNumber) => {

    let column = 0;
    let row = 0; //fila

    const childCount = 100;
    for (let i = 0; i < childCount; i++) {
        const newChild = document.createElement('div');

        if (i !== 0 && column % 10 === 0) {
            column = 0;
            row++;
        }

        newChild.setAttribute('x', column);
        newChild.setAttribute('y', row);

        column++;

        const classNasme = playerNumber === 1
            ? 'bordered-element-1'
            : 'bordered-element-danger';

        newChild.classList.add(classNasme);
        newChild.classList.add('board-grid-element');
        boardElement.appendChild(newChild);
    }

}

const buildBoard = () => {

    for (let i = 0; i < boardsArray.length; i++) {
        fillBoard(boardsArray[i], (i + 1));
    }

    const gridElements = document.querySelectorAll('.board-player1 .board-grid-element');
    for (let gridElement of gridElements) {
        gridElement.addEventListener('click', (e) => {

            if (selectedShip === 0) {
                showErrorMessage('Primero seleccione un barco');
                return;
            }

            const selectedShipElement = document.querySelector(`[ship="${selectedShip}"]`);
            if (selectedShipElement.getAttribute('disponible') == 0) {
                showErrorMessage(`Ship ${selectedShipElement.getAttribute('ship')} has been already selected`);
                return;
            }

            const x = +e.target.getAttribute('x');
            let y = +e.target.getAttribute('y');
            for (let i = 0; i < selectedShip; i++) {
                const coords = `[y="${y}"][x="${x}"]`;
                const gridElement = document.querySelector(coords);

                let isAShip = false;
                for (let cssClass of gridElement.classList) {
                    if (cssClass === 'board-grid-element--barco') {
                        isAShip = true;
                    }
                }

                if (isAShip) {
                    showErrorMessage('The selected area is already a ship');
                    break;
                }

                gridElement.classList.add('board-grid-element--barco');
                y++;
            }

            selectedShipElement.setAttribute('disponible', 0);
            selectedShipElement.classList.add('game-controls-chip__opt--inactivo');
        });
    }
}

buildBoard();


let selectedShip = 0; //5, 4, 3, 2
const chipSelectors = document.querySelectorAll('.game-controls-chip__opt');
for (let chipSelector of chipSelectors) {
    chipSelector.addEventListener('click', (e) => {
        if (+e.target.getAttribute('disponible') === 0) {
            showErrorMessage(`The selected chip ${e.target.getAttribute('ship')} has already been selected`);
            selectedShip = 0;
            return;
        }
        e.target.classList.add('game-controls-chip__opt--activo');
        selectedShip = +e.target.getAttribute('ship');
    });
}

