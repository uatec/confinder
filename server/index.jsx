var express = require('express');
var app = express();
 
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('./generated/app');
var path = require('path');

app.get('/', function(request, response) {
  console.log('request for /');
  response.send(ReactDOMServer.renderToString(<App />));
});
// Static assets
app.use(express.static(path.resolve(__dirname, '../dist')));
 
var port = process.env.port || 3000;
app.listen(port, function() { console.log('Server running on port ' + port);});
