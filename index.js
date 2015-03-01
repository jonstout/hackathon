/*
 * simplenode Web Server
 * Jonathan M. Stout
 * 5/10/2012
 */
var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')

http.createServer( function(request, response) {
	console.log(request)

	if (request.url == '/data/objects.json') {
		if (request.method == "GET") {
			fs.readFile('./data/objects.json', function(err, text) {
				response.setHeader("Content-Type", "text/json");
				response.end(text)
			})
		} else {if (request.method == "PUT") {
			fs.open('./data/objects.json', 'w', function(err, text) {
				if (err) {
					response.setHeader("Content-Type", "text/json");
					response.end("Error")
				} else {
					fs.writeFile('./data/objects.json', text, function (err) {
  						if (err) throw err;
  						console.log('It\'s saved!');
  						fs.close(data, function() {
            				console.log('written success');
        				})
					});
				}
			})
		}
	}}

    var pathname = url.parse(request.url).pathname;
    pathname = path.join(process.cwd(),pathname);

    fs.exists(pathname, function(exists) {
	// If top level route to index.html
	if (pathname == process.cwd() + "/") {
	    pathname += 'index.html';
	}
	// If path exists serve else return 404
	if (exists) {
	    fs.readFile(pathname, "binary", function(err, file) {
		if (err) {
		    response.writeHead(500, {"Content-Type": "text/plain"});
		    response.write(err, "\n");
		    response.end();
		} else {
		    response.writeHeader(200);
		    response.write(file, "binary");
		    response.end();
		}
	    });
	} else {
	    console.log("No route found for", pathname);
	    response.writeHead(404, {"Content-Type": "text/plain"});
	    response.write("404 Not found");
	    response.end();
	}
    });
}).listen(8888);
