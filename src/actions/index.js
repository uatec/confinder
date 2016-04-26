var request = require('superagent');

var urlPrefix = '/api/v1';
var isNode = require('../utils/isNode.js');

// tests if global scope is binded to "global"
if(isNode())  { 
    urlPrefix = 'http://localhost:' + (process.env.PORT || 3000) + '/api/v1';

} else {
    var Auth0Lock = require('auth0-lock');
    var lock = new Auth0Lock(window.env.auth0clientid, window.env.auth0domain);
}
var prefix = require('superagent-prefix')(urlPrefix);

module.exports = {
    
    BEGIN_LOGIN: 'BEGIN_LOGIN',
    beginLogin: function() {
        lock.show();
        return {
            type: this.BEGIN_LOGIN
        };
    },
    
    LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
    loginSucceeded: function(profile) {
        return {
            type: this.LOGIN_SUCCEEDED,
            profile: profile
        };
    },
    
    TRY_LOGIN: 'TRY_LOGIN',
    tryLogin: function() {
        return function(dispatch) {
            var authHash = lock.parseHash(window.location.hash);
            if ( authHash ) {
                lock.getProfile(authHash.id_token, function(err, profile) {
                    if ( err ) {
                        throw new Error(err);
                    } else {
                        dispatch(this.loginSucceeded(profile)); 
                    }
                }.bind(this)); 
            }
        }.bind(this);
    },
    
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
            request.get('/conferences')
                .use(prefix)
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
