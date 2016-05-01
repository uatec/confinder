var request = require('superagent');

var urlPrefix = '/api/v1';
var isNode = require('../utils/isNode.js');

// tests if global scope is binded to "global"
if(isNode())  { 
    urlPrefix = 'http://localhost:' + (process.env.PORT || 3000) + '/api/v1';

} else {
    var Auth0Lock = require('auth0-lock');
    var lock = new Auth0Lock(GLOBAL.env.auth0clientid, GLOBAL.env.auth0domain);
}
var prefix = require('superagent-prefix')(urlPrefix);

module.exports = {
    
    SAVING_CONFERENCE: 'SAVING_CONFERENCE',
    savingConference: function() {
        return {
            type: this.SAVING_CONFERENCE
        };
    },
    
    CONFERENCE_SAVED: 'CONFERENCE_SAVED',
    conferenceSaved: function(savedConferenceId, newConferencesList) {
        return {
            type: this.CONFERENCE_SAVED,
            savedConferenceId: savedConferenceId,
            newConferencesList: newConferencesList
        };
    },
    
    SAVE_CONFERENCE: 'SAVE_CONFERENCE',
    saveConference: function(conferenceId, conference) {
        return function(dispatch) {
            dispatch(this.savingConference());
            if ( conferenceId !== null ) {
                // put to the existing conference id
                request
                    .put('/conferences/' + conferenceId)
                    .use(prefix)
                    .send(conference)
// TODO: enable security
//                    .set('Authorization', 'Bearer: ' + 'blahblahblah')   
                    .end(function(err, res) {
                       if ( err ) {
                           throw new Error(err);
                       }
                       dispatch(this.conferenceSaved(conferenceId, res.body));
                    }.bind(this));
            } else {
                // post the new conference
                request
                    .post('/conferences')
                    .use(prefix)
                    .send(conference)
// TODO: enable security
//                    .set('Authorization', 'Bearer: ' + 'blahblahblah')   
                    .end(function(err, res) {
                       if ( err ) {
                           throw new Error(err);
                       }
                       dispatch(this.conferenceSaved(conferenceId, res.body));
                    }.bind(this));
                
            }
        }.bind(this);
    },
    
    
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
            if ( typeof window === 'undefined') {
                return;  // not gonna happen if we're not in the browser. We only support hashes from auth0 redirects
            }
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
