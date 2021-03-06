module.exports = function(state, action) {
    state = state || {};
    switch ( action.type ) {
        case 'CONFERENCE_SAVED': 
            return Object.assign({}, state, {
               editedConferenced: -1 
            });
        case 'LOGIN_SUCCEEDED': 
            return Object.assign({}, state, {
                profile: action.profile
            });
        case 'RECEIVE_CONFERENCES':
            return Object.assign({}, state, {
                conferences: action.conferences,
                loadingConferences: false
            });
        case 'SELECT_CONFERENCE':
            return Object.assign({}, state, {
               selectedConferenceId: action.conferenceId 
            });
        case 'REQUEST_CONFERENCES':
            return Object.assign({}, state, {
                loadingConferences: true
            });
        default:
            return state;
    }
};