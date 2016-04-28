var React = require('react');

var mui = require('material-ui'),
     TextField = mui.TextField,
     Card = mui.Card,
     CardTitle = mui.CardTitle,
     RaisedButton = mui.RaisedButton,
     CardActions = mui.CardActions,
     CardText = mui.CardText;

var componentMappings = require('./ComponentMapping.js');

module.exports = React.createClass({
   
   propTypes: {
       schema: React.PropTypes.object,
       data: React.PropTypes.object,
       onChange: React.PropTypes.func,
       expanded: React.PropTypes.bool,
    },

    _onChange: function(e) {
        var newValue = e.target.value; 
        this.props.onChange(newValue);
    },

    getInitialState: function()
    {
        return { expanded: this.props.expanded };
    },
   _updateField: function(field, value) {
       this.props.data[field] = value;
       this.props.onChange(this.props.data);
   },
     _buildField: function(key, schema, data) {
      
    var Element = componentMappings()[schema.type];
    
    if ( Element != null )
    {
        return <Element key={key} data={data} schema={schema} onChange={this._updateField.bind(this, key)}></Element>;
    } 
     
    return <CardTitle title={'unsupported type in ' + key} />;
  },
  toggleExpansion: function() {
       this.setState({expanded: !this.state.expanded});
   },
  
   render: function() {
       if ( !this.props.data )
       { 
           return <div>
            no data
           </div>;
           
       }
       
        if ( this.state.expanded )
        {
            var output = [];
            for (var key in this.props.schema.properties)
            {
                output.push(this._buildField(key, this.props.schema.properties[key], this.props.data[key]));
                output.push(<br key={'br-' + key} />);
            }
            output = output.splice(0, output.length - 1);
        
            return <div>
                {output}
            </div>;
       } else { 
           return <div>
            <RaisedButton label=">" onClick={this.toggleExpansion} />
            collapsed object
            </div>;
       }
   }  
});
