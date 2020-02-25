const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer(function(request,response){
    console.log((new Date()) + ' Received ws request for ' + request.url);
    response.writeHead(101,'change to websocket',{'Upgrade':'websocket','Connection': 'Upgrade'});
    response.end();
} );

server.listen(process.env.SERVER_PORT||8081,function(){
    console.log(`Listening on ${server.address().address}${server.address().port}`);
});

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    console.log('WS Request received.')

    connection.on('message', function(message) {
      console.log('Received ws Message:', message.utf8Data);
      connection.sendUTF('Hello I\'m the server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});