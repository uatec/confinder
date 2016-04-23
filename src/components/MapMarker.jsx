var React = require('react');

var pin = require('../images/pin.png');

var MapMarker = React.createClass({
   render: function() {
        return <div>
                 <img src={pin} style={{position: 'relative', top:-50, left: -25}} width="50" height="50" />
               </div>;
   }
});

module.exports = MapMarker;