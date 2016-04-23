
var mongoose     = require('mongoose');

var Conference = require('./src/datamodels/conference.js');


var conferenceModel     = new Conference(); 
conferenceModel.name = 'London'; 
conferenceModel.location    = [ 51, 0 ]; 

conferenceModel.save(function (err) {
    if ( err ) {
        console.log('error');
        console.log(err);
    }
});
console.log('data inserted');



var distance = 1000 / 6371; // 1000km in radians or something :|

var query = Conference.findOne({'location': {
  $near: [
    50.5,
    0.5
  ],
  $maxDistance: 10000
  }
});

query.exec(function (err, conference) {
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
