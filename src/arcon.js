var React = require('react');

var parse = function parse(element) {
  if(element && element.component) {
    return React.createElement(element.component, element.props);
  } else {
    return element;
  }
};

var arcon = {
  parse: parse
};

module.exports = arcon;
module.exports.default = arcon;
