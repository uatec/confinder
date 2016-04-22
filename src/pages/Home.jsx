var React = require('react');
var GoogleMap = require('google-map-react'),
    MapMarker = require('../components/MapMarker.jsx');


var Home = React.createClass({
  render: function() {
      
      var markers = [
          <MapMarker lat={51.5} lng={0} />,
          <MapMarker lat={51.5} lng={0.1} />,
          <MapMarker lat={51.5} lng={0.2} />
      ];
      
    var center =  {lat:51.4826, lng: 0.0077};
    var zoom =  9;
    return <div style={{width: '100%', height: '20em'}} > 
            <GoogleMap
                defaultCenter={center}
                defaultZoom={zoom}>
                {markers}
            </GoogleMap>
        </div>;
  }
});

module.exports = Home;