var express = require("express"),
	fs = require('fs');	
var app = express();

var path = __dirname + '/public/data.txt';
var data = {};

fs.readFile(path, 'utf-8', function(e, rdata){
	data = JSON.parse(rdata);
});

app.get('/', function(request, response) {
	response.send("Hello world");
});

app.get('/set', function(request, response) {
	var queryData = request.query;

	for (var i in queryData) {
		data[i] = queryData[i];
	}
	
	console.log('set');	
	response.send();
		
	fs.writeFile(path, JSON.stringify(data), function(err) {    
    	if(err) {
        	return console.log(err);
    	}
    	
    	console.log("File was saved.");    
	}); 
});

app.get('/get', function(request, response) {
	var queryData = request.query;
	
	console.log('get');		
	response.send(data[queryData['key']]);
});

app.listen(4000, function () {
	console.log('App listening on port 4000.');
});