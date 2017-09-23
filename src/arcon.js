var React = require('react');

var parse = function parse(element) {
  if(element && element.map) {
    return element.map(parse);
  } else if(element && element.component) {
    if(element.children) {
      return React.createElement(element.component, element.props, parse(element.children));
    } else {
      return React.createElement(element.component, element.props);
    }
  } else {
    return element;
  }
};

var arcon = {
  parse: parse
};

module.exports = arcon;
module.exports.default = arcon;
