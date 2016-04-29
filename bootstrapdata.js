
var mongoose     = require('mongoose');

var Conference = require('./src/datamodels/conference.js');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', function(err) {
  console.log('Data connection established');
  if ( err ) {
    console.error(err);
  }
});

var conferenceModel     = new Conference(); 
conferenceModel.id = 'dodldn16';
conferenceModel.name = 'DevOpsDays London 2016'; 
conferenceModel.url = 'http://www.devopsdays.org/events/2016-london/';
conferenceModel.address = '12 Fourteen Street, Tenville, Sixtyshire, ONE1 378';
conferenceModel.location    = {lat:51.512761, lng:-0.099792}; 
conferenceModel.save(function (err) {
    if ( err ) {
        console.log('error');
        console.log(err);
    }
    console.log('data inserted');
});



var distance = 1000 / 6371; // 1000km in radians or something :|

var query = Conference.findOne({'location': {
  $near: [
    50.5,
    0.5
  ],
  $maxDistance: 100000
  }
});

query.exec(function (err, conference) {
    console.log('executing query');
  if (err) {
    console.log(err);
    throw err;
  }

  if (!conference) {
      console.log('no conference found');
  } else {
    console.log('Found conference:' + conference);
 }

});
