var React = require('react');
var GoogleMap = require('google-map-react');
var AutoComplete = require('material-ui').AutoComplete;

var pin = require('../images/pin.png');
var request = require('superagent');

var LocationInput = React.createClass({
    
    getInitialState: function() {
        return { 
            center: { lat: 51.4, lng: 0 },
            userInput: '',
            dataSource: []
        };
    },
    
    mapsLoaded: function(mapResponse) {
        var map = mapResponse.map;
        var maps = mapResponse.maps;
        this.geocoder = new maps.Geocoder();
    },
    
    mapClicked: function(e)
    {
        this.setState({
            center: {
                lat: e.lat,
                lng: e.lng
            }
        });
        this.geocoder.geocode({
            location: {
                lat: e.lat,
                lng: e.lng
        }}, function(response) {
            console.log('setting centre to geocode', response[0].geometry.location);
            this.setState({
               userInput: response[0].formatted_address,
               center: {
                   lat: response[0].geometry.location.lat(),
                   lng: response[0].geometry.location.lng()
               }
            });
        }.bind(this));
    },
    
    getAddress: function() {
        return this.state.userInput;
    },
    
    getLatLng: function() {
        return this.state.center;
    },
    
    handleUpdateInput: function(input) {
        console.log('new input', input);
        this.setState({
            userInput: input
        });
        
        this.geocoder.geocode({ 
            address: input
        }, function(response) {
           this.setState({
               bounds: this.bounds,
               dataSource: response.map(function(r) { return r.formatted_address;})
           }) 
        }.bind(this));
    },
    
    mapChanged: function(e) {
        this.bounds = e.bounds;
    },
    
    render: function () {
        var center = this.state.center;
        console.log(this.state.dataSource);
        return <div>
            <AutoComplete
                searchText={this.state.userInput}
                floatingLabelText="Location"
                filter={AutoComplete.noFilter}
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                />
            <div style={{ width: '100%', height: '20em', overflow: 'hidden' }} >
                <GoogleMap
                    onChange={this.mapChanged}
                    onClick={this.mapClicked}
                    onGoogleApiLoaded={this.mapsLoaded}
                    center={center}
                    defaultZoom={9}>
                    <img
                        lat={center.lat}
                        lng={center.lng}
                        src={pin}
                        alt="Here"
                        style={{ position: 'relative', top: -50, left: -25, cursor: 'pointer' }}
                        width="50"
                        height="50" />
                </GoogleMap>
            </div>
        </div>;
    }
});

module.exports = LocationInput;