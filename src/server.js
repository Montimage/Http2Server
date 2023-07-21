const http2 = require('http2');
const fs = require('fs');
const path = require('path');

var requests=0;


const server = http2.createServer({
  settings: {

    maxFrameSize: 16384 // 16KB
  
    }}
);


server.on('connection', (socket) => {
  // configure TCP_NODELAY and TCP_CORK options
  socket.setNoDelay(true);
  socket.setKeepAlive(true);
});
server.on('request', (req, res) => {
  requests+=1;
  console.log('Incoming request number ',requests,' headers:', req.headers);

  switch (req.method) {
    case 'GET':
      //const imageStream = fs.createReadStream('image.jpg');
     // res.writeHead(200, { 'Content-Type': 'image/jpg' });
      //imageStream.pipe(res);
      try {
        // For GET requests, respond with an image
        const data =  fs.readFile('image.jpg');
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      } catch (err) {
        // Handle the error if the file cannot be read
        console.error('Error reading the image file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
      
      // res.setHeader('Content-Type', 'image/jpg');
      // fs.createReadStream('image.jpg').pipe(res);
     // res.end();
      break;
    case 'DELETE':
      console.log('I emulate this deletion');
      res.end();
      break;
    case 'PUT':
      console.log(`I emulate this ${req.method} method`);
      res.end();
    case 'POST':
      var result=0;
      console.log(`I emulate this ${req.method} method`);
      const answer='<html>  <head>   <title>POST Ok!</title> </head> <body>  Hey guys! Here we will put the content later!  </body> </html>';
      for(var i=0;i<100;i++){
      const randomNumber = Math.floor(Math.random() * 10);
      result += Math.pow(randomNumber, 8);
      result/=2;
      }
      res.write(answer);
      res.end();
      break;
    default:
      res.statusCode = 400;
      res.end();
  }
});
server.on('error',(error)=>{
  console.error(`An error occurred: ${error}`);

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('An error occurred on the server. Please try again later.');
})


const port = 8000;

//const ipAddress = '127.0.0.1'; // Replace with the IP address you want to use
console.log("Server listening on port 8000");

//server.listen(port,ipAddress);
server.listen(port);

