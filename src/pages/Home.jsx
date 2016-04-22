var React = require('react');
var GoogleMap = require('google-map-react'),
    MapMarker = require('../components/MapMarker.jsx'),
    connect = require('react-redux').connect;
    
var mapStateToProps = function(state) {
    return {
        conferences: state.conferences
    }; 
};

var Home = React.createClass({
  render: function() {
      console.log(this);
      var markers = this.props.conferences.map(function(conference) {
          return <MapMarker key={conference.id} lat={conference.location.lat} lng={conference.location.lng} />;
      });
      
    var center =  {lat:51.4826, lng: 0.0077};
    var zoom =  9;
    return  <div>
                <center style={{backgroundColor:'#3F51B5', color: 'white'}}>
                    <h1>Confinder</h1>
                    <h3>Find out what's going on near you.</h3>
                </center>
            
                <div style={{width: '100%', height: '20em'}} > 
                    <GoogleMap
                        defaultCenter={center}
                        defaultZoom={zoom}>
                        {markers}
                    </GoogleMap>
                </div>
            </div>;
  }
});

module.exports = connect(
    mapStateToProps
)(Home);