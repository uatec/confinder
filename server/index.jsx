var express = require('express');
var app = express();

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('./generated/app');
var path = require('path');
var _ = require('lodash');

var envVars = '<script>window.env=' + JSON.stringify(_.pick(process.env, [
  'auth0clientid', 
  'auth0domain', 
  'enable_conference_submission'
  ])) + '</script>';

app.use(function(req, res, next) {
    GLOBAL.navigator = {
        userAgent: req.headers['user-agent']
    };
    next();
});

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
app.route('/api/v1/conferences');

var apiV1ConferencesRouter = new express.Router();
apiV1ConferencesRouter
  .get('/', function(req, res, next) { 
    var query = Conference.find();

    query.exec(function (err, conference) {
      if (err) {
        console.error('error loading api', err);
        throw err;
      }
      
      res.json(conference);
      next();
    });
  });
//  apiV1ConferencesRouter
//   .post('/;

app.use('/api/v1/conferences', apiV1ConferencesRouter);

// Static assets
app.use(express.static(path.resolve(__dirname, '../dist')));

var port = process.env.PORT || 3000;
app.listen(port, function() { console.log('Server running on port ' + port);});
