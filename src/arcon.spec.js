const expect = require('chai').expect;
const arcon = require('./arcon');

describe('arcon', () => {

  describe('parse', () => {

    describe('primitives', () => {
      it('should return null when passed null', () => {
        expect(arcon.parse(null)).to.be.null;
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
    });

  });

});
