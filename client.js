const http = require('http');
const fileSystem=require('fs')

const server = http.createServer(function(request,response){
    console.log((new Date()) + ' Received request for ' + request.url);
    var filePath='client.html'
    var stat=fileSystem.statSync(filePath);
    response.writeHead(200,{'Content-Type':'text/html','Content-Length':stat.size});
    var readStream=fileSystem.createReadStream(filePath);
    readStream.pipe(response);
} );

server.listen(process.env.CLIENT_PORT||8080,function(){
  console.log(`Listening on ${server.address().address}${server.address().port}`);
});
