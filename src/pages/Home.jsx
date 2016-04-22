var React = require('react');
var GoogleMap = require('google-map-react');

var Home = React.createClass({
  render: function() {
    var center =  {lat: 59.938043, lng: 30.337157};
    var zoom =  9;
    return <div style={{width: '100%', height: '20em'}} > 
            <GoogleMap
                defaultCenter={center}
                defaultZoom={zoom}>
            </GoogleMap>
        </div>;
  }
});

module.exports = Home;