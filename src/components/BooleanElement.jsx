var React = require('react');
    
var mui = require('material-ui'),
     Toggle = mui.Toggle;

module.exports = React.createClass({
   
   propTypes: {
       schema: React.PropTypes.object,
       data: React.PropTypes.bool,
       onChange: React.PropTypes.func
    },

    _onToggle: function() {
        this.props.onChange(!this.props.data);
    },
   
   render: function() {
    return <Toggle toggled={this.props.data} label={this.props.schema.description} labelPosition="right" onToggle={this._onToggle} />;   
   }  
});