module.exports = {
    RECEIVE_CONFERENCES: 'RECEIVE_CONFERENCES',
    receiveConferences: function(conferences) {
        return {
            type: this.RECEIVE_CONFERENCES,
            conferences: conferences
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
