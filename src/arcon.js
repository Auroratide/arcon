var React = require('react');

var parseWithComponents = function(components) {
  return function parse(element, index) {
    if(element && element.map) {
      return element.map(parse);
    } else if(element && element.component) {
      var component = components[element.component];
      component = component ? component : element.component;

      if(element.props) {
        element.props.key = element.props.key || ('' + index);
      } else if(index !== undefined) {
        element.props = { key: '' + index }
      }

      if(element.children) {
        return React.createElement(component, element.props, parse(element.children));
      } else {
        return React.createElement(component, element.props);
      }
    } else {
      return element;
    }
  };
};

var create = function create(components) {
  return {
    use: function(c) {
      c = c || {};
      return create(c);
    },
    parse: parseWithComponents(components)
  };
};

var arcon = create({});

module.exports = arcon;
module.exports.default = arcon;
