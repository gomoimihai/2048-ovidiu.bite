var express = require('express')
var app = express();
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/2048'))

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
