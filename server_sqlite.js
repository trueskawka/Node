var express = require("express"),
    fs = require('fs');

//database
var file = __dirname + "/public/test.db",
	exists = fs.existsSync(file),
	sqlite3 = require("sqlite3").verbose(),
	db = new sqlite3.Database(file);

//create table Data with key and value
db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Data (key TEXT, value TEXT)");
  }
});

//open database
var stmt = db.prepare("INSERT INTO Data VALUES (?, ?)");

var app = express();

app.get('/', function(request, response) {
	response.send('Hello World!');
});

app.get('/set', function(request, response) {
	var queryData = request.query;
	
	console.log('set');
	
	for (var i in queryData) {
		//save query data
		stmt.run(i, queryData[i]);
	}
	
	//check if database saves key-value pairs properly
	db.each("SELECT key, value FROM Data", function(err, row) {
		if (err) throw err;
    	console.log(row.key + ": " + row.value);
  	});
	
	response.send();
});

app.get('/get', function(request, response) {
    var queryData = request.query;
    
	console.log('get');

	//retrieve data for a given key
	db.get("SELECT key, value FROM Data WHERE key ='" + queryData['key'] + "' LIMIT 1", 
	function(err, row) {
		if (err) throw err;
    	callback(row.value);
  	});
	
	function callback(row) {
    	response.send(row);
	}	
});

app.listen(4000, function () {
  console.log('App listening on port 4000.');
});