var React = require('react');

var pin = require('../images/pin.png');

var MapMarker = React.createClass({
   render: function() {
        return <div>
                 <img src={pin} 
                    alt="A conference"
                    style={{position: 'relative', top:-50, left: -25, cursor: 'pointer'}} 
                    width="50" 
                    height="50" />
               </div>;
   }
});

module.exports = MapMarker;