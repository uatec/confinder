var express = require('express');
var Conference = require('../src/datamodels/conference.js');
    
var apiV1ConferencesRouter = new express.Router();
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

apiV1ConferencesRouter.use(bodyParser.json()); // for parsing application/json

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', function(err) {
  console.log('Data connection established');
  if ( err ) {
    console.error(err);
  }
});


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
 apiV1ConferencesRouter
  .post('/', function(req, res, next) {
    var conferenceModel = new Conference();
    console.log('received', req.body);
    conferenceModel.id = uuid.v4();
    conferenceModel.name = req.body.name;
    conferenceModel.url = req.body.url;
    conferenceModel.address = req.body.address;
    conferenceModel.location = {lat:51.512761, lng:-0.099792};
    conferenceModel.save(function() {
      res.sendStatus(200);     
      next();  
    });
  });
  
 apiV1ConferencesRouter
  .put('/:conferenceId', function(req, res, next) {
    console.log('put', req.params.conferenceId);
    next();  
  });
  
  
module.exports = apiV1ConferencesRouter;