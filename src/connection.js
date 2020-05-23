import { showFeedbackMessage  } from "./messages-controller";

export let playerId = 0; //1 or 2

let connection;

const connectionInfoElement = document.querySelector('#connection-info');

const connectionForm = document.querySelector('#connection-form');

const connectBtn = document.querySelector('#connect-btn');
connectBtn.addEventListener('click', () => {
    connect();
});

const messageForm = document.querySelector('#message-form');
const messageBtn = document.querySelector('#send-message-btn');
messageBtn.addEventListener('click', () => {
    sendMessageFromForm();
});


//Player 1
const loadConnectionId = () => {
    const peer = new Peer(null);
    peer.on('open', () => {
        connectionInfoElement.innerText = peer.id;
    });

    peer.on('connection', (conn) => {
        playerId = 1;
        connection = conn;
        showFeedbackMessage('Another player has stablished a connection');
        conn.on('data', (data) => {
            showFeedbackMessage(data);
            onFireReceived(data);
        });
    });
}


//Player 2
const connect = () => {

    const connectionId = connectionForm.connectionId.value;

    const peer = new Peer(null);
    const conn = peer.connect(connectionId);
    conn.on('open', () => {
        connection = conn;
        playerId = 2;
        conn.on('data', (data) => {
            showFeedbackMessage(data);
            onFireReceived(data);
        });
    });
}

const sendMessageFromForm = () => {
    const message = messageForm.message.value;
    connection.send(message);
}

export const sendMessage = (message) => {
    connection.send(message);
}

const onFireReceived = (shootCoords) => {
    if(shootCoords.indexOf(',') !== -1){
        const coords = shootCoords.split(',');
        const coordsSelector = `[y="${coords[1]}"][x="${coords[0]}"]`;
        const gridElement = document.querySelector(coordsSelector);

        if(gridElement.classList.contains('board-grid-element--barco')){
            gridElement.style.backgroundColor = 'red';
        }
        else {
            gridElement.style.backgroundColor = 'yellow';
        }
    }
}

loadConnectionId();


