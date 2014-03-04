var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");

function start(response) {
console.log("Request handler 'start' was called.");

exec("/home/lukas/Desktop/nodeServer2/TestIt2",
{ timeout: 10000, maxBuffer: 20000*1024 },
function (error, stdout, stderr) {
response.writeHead(200, {"Content-Type": "text/html"});
response.write("<DOCTYPE HTML>");
response.write("<html><body>");
response.write(stdout);
response.write("</body></html>")
response.end();
});
}

function upload(response) {
console.log("Request handler 'upload' was called.");
response.writeHead(200, {"Content-Type": "text/plain"});
response.write("Hello Upload");
response.end();
}

function show(response, query) {
	var Path = querystring.parse(query)["imgName"];
	console.log("Request handler 'show' was called");
	console.log("request eq " + query);
	
	if(Path== null)
	{
		response.writeHead(200, {"Content-Type": "text/plain"})
    	response.write(" 404 no Path specified");
    	response.end();
	}
	else
	{
         // This line opens the file as a readable stream
  		var readStream = fs.createReadStream("./"+Path);

  		// This will wait until we know the readable stream is actually valid before piping
  		readStream.on('open', function () {
    	// This just pipes the read stream to the response object (which goes to the client)
    		response.writeHead(200, {"Content-Type": "image/png"});
    		readStream.pipe(res);
  		});

  		// This catches any errors that happens while creating the readable stream (usually invalid names)
  		readStream.on('error', function(err) {
    	
		console.log();    		
		response.writeHead(200, {"Content-Type": "text/plain"})
    	response.write(" 404 Ressource named "+Path+" not found");
    	response.end();

  		});
		
	}
}

exports.start = start;
exports.upload = upload;
exports.show = show;