const http2 = require('http2');
const process = require('process');

const args = process.argv.slice(2);
if(args.length!=1){
  console.log(args)
  console.log("Insert  http method");
  process.exit(1);
}
const method = args;
// Create a new HTTP/2 client session
const client = http2.connect('http://localhost:8000');

// Make a GET request to the server
const req = client.request({
  ':method': method,
  ':path': '/'
});

// Log the response from the server
req.on('response', (headers, flags) => {
  console.log(`HTTP/2 response received with status ${headers[':status']}`);
  req.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

// End the request
req.end();
