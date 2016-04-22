var React = require('react');

var MapMarker = React.createClass({
   render: function() {
        return <div>
                 <img src="images/pin.png" style={{position: 'relative', top:-50, left: -25}} width="50" height="50" />
               </div>;
   }
});

module.exports = MapMarker;