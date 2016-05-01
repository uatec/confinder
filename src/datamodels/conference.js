var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConferenceSchema   = new Schema({
    id: String,
    created_by: String,
    url: String,
    name: String,
    address: String,
    location: {
        type: {
            lat: String,
            lng: String
        },
        index: '2d'
    }
});

module.exports = mongoose.model('Conference', ConferenceSchema);