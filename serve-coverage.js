const finalHandler = require('finalHandler');
const serveStatic = require('serve-static');
const http = require('http');

const serve = serveStatic('coverage/dma-front', {
  index: [
    'index.html',
    'index.htm',
  ],
});

const server = http.createServer(function onRequest(request, response) {
  serve(request, response, finalHandler(request, response));
});

const port = 4200;
const hostname = '192.168.178.94';

server.listen(port, hostname, function onServerCreated() {

  console.log(`listening to http://${hostname}:${port}\n`);
});
