var React = require('react');

var mui = require('material-ui'),
    TextField = mui.TextField,
    DatePicker = mui.DatePicker;

module.exports = React.createClass({

    propTypes: {
        schema: React.PropTypes.object,
        data: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    _onChange: function (e) {
        var newValue = null;
        switch (this.props.schema.format) {
            case 'date-time':
                newValue = arguments[1];
                break;
            default:
                newValue = e.target.value;
                break;
        }
        if (newValue !== null) {
            this.props.onChange(newValue);
        }
    },

    render: function () {
        switch (this.props.schema.format) {
            case 'date-time':
            console.log(this.props.data);
                return <DatePicker floatingLabelText={this.props.schema.title}
                    value={this.props.data}
                    hintText={this.props.schema.description}
                    onChange={this._onChange}
                    mode="landscape" />;
            default:
                return <TextField floatingLabelText={this.props.schema.title} value={this.props.data} hintText={this.props.schema.description} onChange={this._onChange} />;
        }
    }
});
