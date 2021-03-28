var http = require('http');
http.createServer(function(req, res) {
    res.write("Hello World!");
    res.end();
}).listen(8080); // just a test script to check things are working