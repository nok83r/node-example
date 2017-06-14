var http = require('http');
var path = require('path');
var fs = require('fs');

var hostname = 'localhost';
var port = 9091;

var server = http.createServer(function(req, res) {

    console.log('Request for ' + req.url + ' by method ' + req.method);
    
    if(req.method === 'GET') {
        var fileUrl;

        if (req.url === '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./html' + fileUrl);

        var fileExt = path.extname(filePath);

        if(fileExt === '.html') {
            fs.exists(filePath, function(exists) {
                
                if(!exists) {
                    res.writeHead(404, {'Content-type': 'text/html' });
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream(filePath).pipe(res);

            });
        } else {
            res.writeHead(404, {'Content-type': 'text/html' });
            res.end('<h1>Error 404: ' + fileUrl + ' not a HTML file</h1>');
        }
    } else {
        res.writeHead(404, {'Content-type': 'text/html' });
        res.end('<h1>Error 404: ' + req.method + ' not supported</h1>');
    }

});

server.listen(port, hostname, function(){
    console.log(`Server running http://${hostname}:${port}/`);
});