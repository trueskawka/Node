var express = require("express");	
var app = express();
var url = require('url');

var data = {};

app.get('/set', function(request, response) {
	var my_url = request.url;
	var queryData = url.parse(my_url, true).query;
	
	for (var i in queryData) {
		data[i] = queryData[i];
	}
	
	console.log('set');
	console.log(data);
	
	response.send();
});

app.get('/get', function(request, response) {
	var my_url = request.url;
	var queryData = url.parse(my_url, true).query;
	
	console.log('get');
		
	response.send(data[queryData['key']]);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});