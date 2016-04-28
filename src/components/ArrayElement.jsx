var React = require('react');

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    FloatingActionButton = mui.FloatingActionButton,
    Card = mui.Card,
    CardTitle = mui.CardTitle,
    CardText = mui.CardText,
    ContentAdd = mui.SvgIcon.ContentAdd,
    ContentRemove = mui.SvgIcon.ContentRemove;

var componentMappings = require('./ComponentMapping.js');

module.exports = React.createClass({
   
   propTypes: {
       schema: React.PropTypes.object,
       data: React.PropTypes.array,
       onChange: React.PropTypes.func
    },
    getInitialState: function()
    {
        return {
            expanded: false      
        }
    },

    _onChange: function(index, value) {
        this.props.data[index] = value;
        this.props.onChange(this.props.data);
        // var clone = _.clone(this.props.data);
        // clone[index] = value;
        // this.props.onChange(clone);
    },
    
    removeElement: function(key)
    {
        this.props.data.splice(key, 1);
        this.props.onChange(this.props.data);
    },

    renderFields: function(data, key)
    {
          var Element = componentMappings()[this.props.schema.items.type];
        
          if ( Element != null )
            {
                return <span>
                    <FloatingActionButton onClick={this.removeElement.bind(this, key)}>
                        <ContentRemove />
                    </FloatingActionButton>
                    <Element data={data} schema={this.props.schema.items} onChange={this._onChange.bind(this, key)}></Element>
                </span>;
            }  else { 
               return "unknown element type: " + this.props.schema.items.type;
            }
     
    },
   
   addElement: function() {
        this.props.data.push({});
        this.props.onChange(this.props.data);    
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
        return <div>
            <RaisedButton label="<" onClick={this.toggleExpansion} />
            <FloatingActionButton onClick={this.addElement}>
                <ContentAdd />
            </FloatingActionButton>
            {this.props.data.map(this.renderFields)}
        </div>;
       } else { 
           return <div>
            <RaisedButton label=">" onClick={this.toggleExpansion} />
            <FloatingActionButton onClick={this.addElement}>
                <ContentAdd />
            </FloatingActionButton>
            {this.props.data.length} element array.
            </div>;
       }
   }  
});

