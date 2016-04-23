var request = require('superagent');

module.exports = {
    REQUEST_CONFERENCES: 'REQUEST_CONFERENCES',
    requestConferences: function() {
        return {
            type: this.REQUEST_CONFERENCES,
        };
    },
    RECEIVE_CONFERENCES: 'RECEIVE_CONFERENCES',
    receiveConferences: function(conferences) {
        return {
            type: this.RECEIVE_CONFERENCES,
            conferences: conferences
        };
    },
    
    fetchConferences: function() {
        return function(dispatch) {
            dispatch(this.requestConferences());
            request.get('http://localhost:3000/api/v1/conferences')
                .end(function(err, response) {
                    if ( err ) { 
                        throw new Error(err);
                    }
                    dispatch(this.receiveConferences(response.body));
                }.bind(this));
        }.bind(this);
    },
    
    SELECT_CONFERENCE: 'SELECT_CONFERENCE',
    selectConference: function(conferenceId) {
        return {
            type: this.SELECT_CONFERENCE,
            conferenceId: conferenceId
        };
    }
};
/* 
    {
        type: 'RECEIVE_CONFERENCES',
        conferences: [{
			id: '0', 
			name: 'DevOpsDays London 2016',
			location: {
				lat: 50,
				lng: 0.4
			}
		},
		{
			id: '1', 
			name: 'Kubecon 2016',
			location: {
				lat: 50.5,
				lng: 0.3
			}
		}]
    }

*/
