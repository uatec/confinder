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
        this.props.onChange(newValue);
    },
   
   render: function() {
    return <TextField value={'' + this.props.data} hintText={this.props.schema.description} onChange={this._onChange} />;   
   }  
});