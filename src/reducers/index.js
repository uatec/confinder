module.exports = function(state, action) {
    switch ( action.type ) {
        case 'RECEIVE_CONFERENCES':
            return Object.assign({}, state, {
                conferences: action.conferences
            });
        case 'SELECT_CONFERENCE':
            return Object.assign({}, state, {
               selectedConferenceId: action.conferenceId 
            });
        default:
            return state;
    }
};