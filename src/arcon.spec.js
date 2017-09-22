const expect = require('chai').expect;
const arcon = require('./arcon');

describe('arcon', () => {

  describe('parse', () => {
    it('should return the passed string when given a string', () => {
      expect(arcon.parse('')).to.equal('');
      expect(arcon.parse('a string')).to.equal('a string');
      expect(arcon.parse('ANOTHER STRING')).to.equal('ANOTHER STRING');
      expect(arcon.parse('String with symboles #$%^.')).to.equal('String with symboles #$%^.');
    });

    it('should return the passed number when given a number', () => {
      expect(arcon.parse(0)).to.equal(0);
      expect(arcon.parse(1)).to.equal(1);
      expect(arcon.parse(-1)).to.equal(-1);
      expect(arcon.parse(2.5)).to.equal(2.5);
    });

    it('should return the passed boolean when given a boolean', () => {
      expect(arcon.parse(true)).to.be.true;
      expect(arcon.parse(false)).to.be.false;
    });
  });
  
});
