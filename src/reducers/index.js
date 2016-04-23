module.exports = function(state, action) {
    state = state || {};
    switch ( action.type ) {
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