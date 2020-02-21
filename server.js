const ws = require('ws');
const wsServer = new ws.Server({port:process.env.SERVER_PORT||8081});

console.log(`Listening on ${wsServer.address().address}${wsServer.address().port}`);
wsServer.on('connection', function(connection) {
    console.log('WS Request received.')

    connection.on('message', function(message) {
        console.log('Received ws Message:', message);
        connection.send('Hello I\'m the server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
