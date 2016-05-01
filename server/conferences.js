var express = require('express');
var Conference = require('../src/datamodels/conference.js');

var bodyParser = require('body-parser');
var uuid = require('node-uuid');

var privateRouter = new express.Router();
var jwt = require('express-jwt');
var jwtCheck = jwt({
  secret: new Buffer(process.env.auth0clientsecret, 'base64'),
  audience: process.env.auth0clientid
});

privateRouter.use(bodyParser.json()); // for parsing application/json
privateRouter.use('/', jwtCheck);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', function (err) {
  console.log('Data connection established');
  if (err) {
    console.error(err);
  }
});

privateRouter
  .post('/', function (req, res, next) {
    var conferenceModel = new Conference();
    console.log('received', req.body);
    conferenceModel.id = uuid.v4();
    conferenceModel.name = req.body.name;
    conferenceModel.url = req.body.url;
    conferenceModel.address = req.body.address;
    conferenceModel.location = req.body.location;
    conferenceModel.created_by = req.user.sub;
    conferenceModel.save(function () {
      res.sendStatus(200);
      next();
    });
  });

privateRouter
  .put('/:conferenceId', function (req, res, next) {
    console.log('put', req.params.conferenceId);
    next();
  });

var publicRouter = new express.Router();

publicRouter
  .get('/', function (req, res, next) {
    var query = Conference.find();

    query.exec(function (err, conferences) {
      if (err) {
        console.error('error loading api', err);
        throw err;
      }

      res.json(conferences);
      next();
    });
  });

publicRouter.use('/my', privateRouter);


module.exports = publicRouter;