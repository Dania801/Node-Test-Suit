const sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

// used to control the actions and values returned by the stubbed method
var inspector = {
  getWindowSize: function() {
    return $(window).width();
  },
  getDevice: function() {
    return this.getWindowSize() <= 480 ? 'mobile' : 'desktop';
  }
};

it('When width < 480, return mobile', function() {
  sinon.stub(inspector, 'getWindowSize');
  inspector.getWindowSize.returns(479);
  device = inspector.getDevice();

  expect(device).to.equal('mobile');
  inspector.getWindowSize.restore();
});
