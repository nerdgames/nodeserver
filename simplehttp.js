var http = require("http"); // Including HTTP module so we can create the server.
var url  = require("url");  // Including URL module to parse request params.
var fs   = require("fs");   // Including File-System module to read/write files.

// Create the server. 
http.createServer(function(request, response) {
    // Attach listener and event.
    request.on("end", function() {
        
        // Parse the request for arguments and store them in "_get".
        var _get = url.parse(request.url, true).query;

        // Write headers to the response.
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        
        // Send data and end response.
        response.end('Here are your data: ' + _get['data']);
        
        // Log the request data.
        fs.appendFile("request.log",_get['data']+"\n", function(){});
    });
}).listen(8080);
