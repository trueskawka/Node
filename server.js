var http = require("http");
var url = require('url');
var server = http.createServer();

server.on('request', function(request,response){
	var method = request.method;
	var my_url = request.url;
	var queryData = url.parse(my_url, true).query;
	
	response.writeHeader(200, {"Content-Type": "text/plain"});
	
	if (queryData.somekey) {
		response.end('Data received');
	} else {
		response.end('somevalue');
	}
	
}).listen(4000);

console.log("Server Running on 4000");