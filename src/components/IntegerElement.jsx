var React = require('react');
    
var mui = require('material-ui'),
     TextField = mui.TextField;

module.exports = React.createClass({
   
   propTypes: {
       schema: React.PropTypes.object,
       data: React.PropTypes.number,
       onChange: React.PropTypes.func
    },

    _onChange: function(e) {
        var newValue = e.target.value; 
        if ( newValue == null || newValue.length == 0 ) this.props.onChange(null);
        else if ( /^[0-9]*$/.test(newValue) ) {
            this.props.onChange(parseInt(newValue));
        }  
    },
   
   render: function() {
    return <TextField value={this.props.data} hintText={this.props.schema.description} onChange={this._onChange} />;   
   }  
});