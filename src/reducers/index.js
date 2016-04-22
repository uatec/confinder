module.exports = function(state, action) {
    switch ( action.type ) {
        case 'RECEIVE_CONFERENCES':
            return Object.assign({}, state, {
                conferences: action.conferences
            });
        default:
            return state;
    }
};