var express = require('express'),
http = require('http');

var hostname = 'localhost';
var port = '3000';

var app = express();

app.use(function(req, res, next){
  console.log(req.headers);

  res.writeHead(200,{'Context-Type' : 'text/html'});
  res.end("<h1> Hello World </h1>")
});

var server = http.createServer(app);

server.listen(port, hostname, function(){
  console.log("Server is now listening at http://${hostname}:${port}");
})
