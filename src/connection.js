
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
    sendMessage();
});


//Player 1
const loadConnectionId = () => {
    const peer = new Peer(null);
    peer.on('open', () => {
        connectionInfoElement.innerText = peer.id;
    });

    peer.on('connection', (conn) => {
        connection = conn;
        conn.on('data', (data) => {
            console.log('message from player 2: ', data);
        });
    });
}


const connect = () => {

    const connectionId = connectionForm.connectionId.value;

    const peer = new Peer(null);
    const conn = peer.connect(connectionId);
    conn.on('open', () => {
        connection = conn;
        conn.send('hola');
        conn.on('data', (data) => {
            console.log('message from player 1: ', data);
        });
    });
}

const sendMessage = () => {
    const message = messageForm.message.value;
    connection.send(message);
}

loadConnectionId();
