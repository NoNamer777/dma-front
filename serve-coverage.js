const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const http = require('http');

const serve = serveStatic('coverage/dma-front', {
    index: ['index.html', 'index.htm'],
});

const remoteServer = http.createServer(function onRequest(request, response) {
    serve(request, response, finalhandler(request, response));
});

const localServer = http.createServer(function onRequest(request, response) {
    serve(request, response, finalhandler(request, response));
});

const port = 4300;
const hostname = '192.168.178.94';

remoteServer.listen(port, hostname, function onServerCreated() {
    console.log(`\nlistening to http://${hostname}:${port}`);
});

localServer.listen(port, 'localhost', function onServerCreated() {
    console.log(`listening to http://localhost:${port}\n`);
});
