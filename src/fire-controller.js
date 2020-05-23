import { playerId, sendMessage } from "./connection";
import { showErrorMessage } from "./messages-controller";

const gridElements = document.querySelectorAll('.board-player2 .board-grid-element');
for (let cell of gridElements) {
    cell.addEventListener('click', (e) => {
        if(playerId == 0){
            showErrorMessage('There are not connection stablished yet');
            return;
        }
        const y = e.target.getAttribute('y');
        const x = e.target.getAttribute('x');
        sendShoot(x, y);
    });
}

const sendShoot = (x, y) => {
    sendMessage(`${x},${y}`);
}


