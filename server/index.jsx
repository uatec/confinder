var express = require('express');
var app = express();

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('./generated/app');
var path = require('path');
var _ = require('lodash');

var envVars = '<script>window.env=' + JSON.stringify(_.pick(process.env, ['auth0clientid', 'auth0domain'])) + '</script>';


app.get('/', function(request, response) {
  var body = ReactDOMServer.renderToString(<App />);
  response.send('<html><head>' + envVars + '</head><body><div id="content">' + body + '</div><script src="/bundle.js"></script></body></html>');
});

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', function(err) {
  console.log('Data connection established');
  if ( err ) {
    console.error(err);
  }
});

var Conference = require('../src/datamodels/conference.js');

app.get('/api/v1/conferences', function(req, res, next) { 
  console.log('request for /api/v1/conferences');
  var query = Conference.find();

  query.exec(function (err, conference) {
    console.log('\tquery returned: ' + conference);
    if (err) {
      console.log(err);
      throw err;
    }
    
    res.json(conference);
    console.log('\tresponse sent to client.');
    next();
  });
  console.log('\tasync query initiated');
});

// Static assets
app.use(express.static(path.resolve(__dirname, '../dist')));

var port = process.env.PORT || 3000;
app.listen(port, function() { console.log('Server running on port ' + port);});
