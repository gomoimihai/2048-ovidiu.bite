var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	var http = require('http'),
		fs = require('fs');


	fs.readFile('./index.html', function (err, html) {
		if (err) {
			throw err; 
		}       
		http.createServer(function(request, response) {  
			response.writeHeader(200, {"Content-Type": "text/html"});  
			response.write(html);  
			response.end();  
		}).listen(8000);
	});
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

