const http = require('http');
const fileSystem=require('fs')

const serverPort=process.env.SERVER_PORT||443;
const serverPath=process.env.SERVER_PATH||'';
const serverProtocol=process.env.SERVER_PROTOCOL||'wss';

const server = http.createServer(function(request,response){
    console.log((new Date()) + ' Received request for ' + request.url);
    var filePath='client.html';

    var serverConnection=`${serverProtocol}://\${location.hostname}:${serverPort}/${serverPath}`;
    if(serverPort===443 || serverPort==='443'){
      serverConnection=`wss://\${location.hostname}/${serverPath}`;
    }

    var page=fileSystem.readFileSync(filePath,'utf8');
    page=page.replace('{{SERVERCONNECTION}}',serverConnection);
    response.writeHead(200,{'Content-Type':'text/html','Content-Length':Buffer.byteLength(page, 'utf8')});
    response.write(page);
    response.end();
    console.log((new Date()) + "served page");
} );

server.listen(process.env.CLIENT_PORT||8080,function(){
  console.log(`Listening on ${server.address().address}${server.address().port}`);
});
