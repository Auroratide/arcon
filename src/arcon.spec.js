const React = require('react');
const expect = require('chai').expect;
const arcon = require('./arcon');

describe('arcon', () => {

  describe('parse', () => {

    describe('primitives', () => {
      it('should return null when passed null', () => {
        expect(arcon.parse(null)).to.be.null;
      });

      it('should return undefined when passed undefined', () => {
        expect(arcon.parse(undefined)).to.be.undefined;
      });

      it('should return the passed string when parsing a string', () => {
        expect(arcon.parse('')).to.equal('');
        expect(arcon.parse('a string')).to.equal('a string');
        expect(arcon.parse('ANOTHER STRING')).to.equal('ANOTHER STRING');
        expect(arcon.parse('String with symboles #$%^.')).to.equal('String with symboles #$%^.');
      });

      it('should return the passed number when parsing a number', () => {
        expect(arcon.parse(0)).to.equal(0);
        expect(arcon.parse(1)).to.equal(1);
        expect(arcon.parse(-1)).to.equal(-1);
        expect(arcon.parse(2.5)).to.equal(2.5);
      });

      it('should return the passed boolean when parsing a boolean', () => {
        expect(arcon.parse(true)).to.be.true;
        expect(arcon.parse(false)).to.be.false;
      });
    });

    describe('components', () => {
      it('should return a react element when parsing a basic html component', () => {
        expect(arcon.parse({
          component: 'div'
        }).type).to.equal('div');

        expect(arcon.parse({
          component: 'span'
        }).type).to.equal('span');

        expect(arcon.parse({
          component: 'p'
        }).type).to.equal('p');

        expect(arcon.parse({
          component: 'a'
        }).type).to.equal('a');
      });

      it('should pass no props to the react element when the component has no props', () => {
        expect(arcon.parse({
          component: 'div'
        }).props).to.be.empty;
      });

      it('should pass props of the component object as props to the react element', () => {
        expect(arcon.parse({
          component: 'div',
          props: {
            className: 'class',
            number: 5
          }
        }).props).to.deep.equal({
          className: 'class',
          number: 5
        });
      });

      it('should not pass children when the component does not define children', () => {
        expect(arcon.parse({
          component: 'div'
        }).props.children).to.be.undefined;
      });

      it('should parse a component\'s single child', () => {
        expect(arcon.parse({
          component: 'div',
          children: {
            component: 'span'
          }
        }).props.children.type).to.equal('span');
      });

      it('should parse a component\'s array of children', () => {
        const parsed = arcon.parse({
          component: 'div',
          children: [ {
            component: 'span',
            props: { key: 0 }
          }, {
            component: 'p',
            props: { key: 1 }
          } ]
        });

        expect(parsed.props.children).to.have.length(2);
        expect(parsed.props.children.map(c => c.type)).to.have.ordered.members(['span', 'p']);
      });
    });

    describe('arrays', () => {
      it('should parse an empty array as an empty array', () => {
        const parsed = arcon.parse([]);
        expect(parsed).to.be.a('array');
        expect(parsed).to.be.empty;
      });

      it('should parse arrays by parsing each element in the array', () => {
        expect(arcon.parse([ {
          component: 'div'
        }, {
          component: 'span'
        }, {
          component: 'p'
        } ]).map(elem => elem.type)).to.have.ordered.members([
          'div', 'span', 'p'
        ]);
      });
    });

  });

  describe('use', () => {

    const CustomComponent = props => React.createElement('div', props);

    it('should parse custom components', () => {
      const parser = arcon.use({ CustomComponent });
      expect(parser.parse({
        component: 'CustomComponent'
      }).type.name).to.equal('CustomComponent');
    });

    it('should assume unknown components as regular html tags', () => {
      expect(arcon.parse({
        component: 'CustomComponent'
      }).type).to.equal('CustomComponent');
    });

    it('should use an empty component library when passed null', () => {
      const parser = arcon.use(null);
      expect(parser.parse({
        component: 'CustomComponent'
      }).type).to.equal('CustomComponent');
    });

    it('should use an empty component library when passed undefined', () => {
      const parser = arcon.use(undefined);
      expect(parser.parse({
        component: 'CustomComponent'
      }).type).to.equal('CustomComponent');
    });

  });

  describe('overall', () => {
    const Link = props => React.createElement(
      'a',
      { href: props.to },
      props.children
    );

    const components = { Link };

    const structure = {
      component: 'p',
      children: ['This is a test.  Click ', {
        component: 'Link',
        children: 'here',
        props: {
          to: 'http://auroratide.com',
          key: 0
        }
      }, ' to go to my blog.']
    };

    const parser = arcon.use(components);

    it('should parse the given complex structure', () => {
      expect(parser.parse(structure)).to.deep.equal(
        React.createElement('p', {}, [
          'This is a test.  Click ',
          React.createElement(Link, { to: 'http://auroratide.com', key: 0 }, 'here'),
          ' to go to my blog.'
        ])
      );
    });
  });

});
