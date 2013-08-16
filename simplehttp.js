/*
 * simplehttp - the most basic node.js server you can make
 *   Uses node.js v0.10.15
 *   Modules:
 *     <none>
 */

var http = require("http"); // Including HTTP module so we can create the server.
var url  = require("url");  // Including URL module to parse request params.
var fs   = require("fs");   // Including File-System module to read/write files.

// Create the server. 
http.createServer(function(request, response) {
    
    // Let the user know things are happening.
    console.log("Received a request.");
  
    // Respond to request, once complete. 
    request.on("end", function() {
        
        // Announce that the request has been received. 
        console.log("Request ended. Parsing...");

        // Parse the request for arguments and store them in "_get".
        var _get = url.parse(request.url, true).query;

        // Write headers to the response.
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        
        // Send data and end response.
        response.end('Here are your data: ' + _get['data']);
        
        // Log the request data.
        fs.appendFile("request.log",_get['data']+"\n", function(err){
            if (err) console.log("Error writing to the requests log..."); 
        });
    });

    request.resume();
}).listen(8080);

console.log("Serving on localhost:8080.");
