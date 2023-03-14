const http2 = require('http2');
const fs = require('fs');
const { createServer } = require('net');

const tcpServer = createServer();

// Log TCP connections
tcpServer.on('connection', (socket) => {
    console.log(`TCP connection established from ${socket.remoteAddress}:${socket.remotePort}`);
  });
// Create a new HTTP/2 server
const server = http2.createServer();
server.on('frameReceived', (frame) => {
    console.log(`Received frame: ${JSON.stringify(frame)}`);
  });
  
// Handle all types of requests
server.on('stream', (stream, headers) => {
    stream.on('error', (error) => console.error(error));

    console.log('Incoming header : ', headers);

  switch(headers[':method']) {
    case 'GET':
      handleGetRequest(stream);
      break;
    case 'POST':
      handlePostRequest(stream);
      break;
    case 'PUT':
      handlePutRequest(stream);
      break;
    case 'DELETE':
      handleDeleteRequest(stream);
      break;
    default:
      stream.respond({':status': 400});
      stream.end();
      break;
  }
});

// Define handlers for each type of request
function handleGetRequest(stream) {
  // Handle GET request
  stream.respond({
    ':status': 200,
    'content-type': 'text/plain'
  });
  stream.end('<h1>Handling Get</h1>');
}

function handlePostRequest(stream) {
  // Handle POST request
  stream.respond({
    ':status': 200,
    'content-type': 'text/plain'
  });
  stream.end('<h1>Handling Post</h1>');
}

function handlePutRequest(stream) {
  // Handle PUT request
  stream.respond({
    ':status': 200,
    'content-type': 'text/plain'
  });
  stream.end('<h1>Handling Put</h1>');
}

function handleDeleteRequest(stream) {
  // Handle DELETE request
  stream.respond({
    ':status': 200,
    'content-type': 'text/plain'
  });
  stream.end('<h1>Handling DELETE request</h1>');
}

// Start the TCP server
tcpServer.listen(8000, () => {
    console.log('TCP server listening on port 8000');
  });
  
  // Start the HTTP/2 server
  server.listen(tcpServer, () => {
    console.log('HTTP/2 server listening on port 8000');
  });