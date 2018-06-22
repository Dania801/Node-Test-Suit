const sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;


var PageTracking = function(options) {
  this.options = options;
};
PageTracking.prototype.init = function() {
  this.sendTracking(this.options);
};
PageTracking.prototype.sendTracking = function (options) {
  console.log('Tracking sent');
};


it('call sendTracking with options', function() {
  var pageTracking = new PageTracking({
    product: 'cap',
    category: 'acessories'
  });
  // spy on a method
  sinon.spy(pageTracking ,'sendTracking');
  sinon.spy(pageTracking, 'init');
  pageTracking.init();

  // ensure the spied method is being called
  expect(pageTracking.sendTracking.called).to.be.true;
  expect(pageTracking.sendTracking.calledOnce).to.be.true;
  expect(pageTracking.sendTracking.callCount).to.be.eq(1);
  expect(pageTracking.sendTracking.calledAfter(pageTracking.init)).to.be.true;
  expect(pageTracking.init.calledImmediatelyBefore(pageTracking.sendTracking)).to.be.true;
  expect(pageTracking.sendTracking.calledOn(pageTracking));
  expect(pageTracking.sendTracking.threw("TypeError")).to.not.be.true;
  expect(pageTracking.sendTracking.returnValues).to.be.ok;
  expect(pageTracking.sendTracking.exceptions).to.be.ok;
  // ensure that the spied method is being called by the x arguments
  expect(pageTracking.sendTracking.calledWithExactly({
    product: 'cap',
    category: 'acessories'
  })).to.be.true;
  // restore the spy
  pageTracking.sendTracking.resetHistory(); // resets the value of the spy
  pageTracking.sendTracking.restore();
  pageTracking.init.restore();
});
