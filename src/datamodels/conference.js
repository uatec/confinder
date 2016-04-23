var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConferenceSchema   = new Schema({
    name: String,
    location: {
        type: [Number],
        index: '2d'
    }
});

module.exports = mongoose.model('Conference', ConferenceSchema);