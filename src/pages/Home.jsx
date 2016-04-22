var React = require('react');
var GoogleMap = require('google-map-react'),
    MapMarker = require('../components/MapMarker.jsx'),
    connect = require('react-redux').connect,
    _ = require('lodash');
   
var actions = require('../actions');
    
var mapStateToProps = function(state) {
    return {
        conferences: state.conferences,
        selectedConferenceId: state.selectedConferenceId
    }; 
};

var mapDispatchToProps = function(dispatch) {
  return {
      selectConference: function(conferenceId) {
          dispatch(actions.selectConference(conferenceId));
      }
  };  
};

var Home = React.createClass({

  render: function() {

      var markers = this.props.conferences.map(function(conference) {
          return <MapMarker key={conference.id} 
            lat={conference.location.lat} 
            lng={conference.location.lng} />;
      });
      
      var selectedConference = null;
      if ( this.props.selectedConferenceId ) {
          selectedConference = _.find(this.props.conferences, {id: this.props.selectedConferenceId});
      }
      
    var center =  {lat:51.4826, lng: 0.0077};
    var zoom =  9;
    return  <div>
                <center style={{backgroundColor:'#3F51B5', color: 'white'}}>
                    <h1>Confinder</h1>
                    <h3>Find out what's going on near you.</h3>
                </center>
            
                <div style={{width: '100%', height: '20em'}} > 
                    <GoogleMap
                        onChildClick={this.props.selectConference}
                        defaultCenter={center}
                        defaultZoom={zoom}>
                        {markers}
                    </GoogleMap>
                </div>
                
                {this.props.selectedConferenceId ? 
                <div>
                    <a href={selectedConference.url} target="_blank">
                        <h2>
                            {selectedConference.name}
                        </h2>
                    </a>
                </div> : null}
            </div>;
  }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);