module.exports =
    function() { 
        return  {
      'string': require('./TextElement.jsx'),
      'integer': require('./IntegerElement.jsx'),
      'array': require('./ArrayElement.jsx'),
      'number': require('./NumberElement.jsx'),
      'boolean': require('./BooleanElement.jsx'),
      'object': require('./ObjectElement.jsx')
  };
    };
  