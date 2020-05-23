import { playerId, sendMessage } from "./connection";

const gridElements = document.querySelectorAll('.board-player2 .board-grid-element');
for (let cell of gridElements) {
    cell.addEventListener('click', (e) => {
        const y = e.target.getAttribute('y');
        const x = e.target.getAttribute('x');
        sendShoot(x, y);
    });
}

const sendShoot = (x, y) => {
    sendMessage(`${x},${y}`);
}


