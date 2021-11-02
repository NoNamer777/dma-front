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

remoteServer.listen(port, '0.0.0.0', function onServerCreated() {
    console.log(`\nlistening to http://0.0.0.0:${port}`);
});

localServer.listen(port, 'localhost', function onServerCreated() {
    console.log(`listening to http://localhost:${port}\n`);
});
