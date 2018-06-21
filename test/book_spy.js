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


it.only('call sendTracking with options', function() {
  var pageTracking = new PageTracking({
    product: 'cap',
    category: 'acessories'
  });
  sinon.spy(pageTracking ,'sendTracking');
  pageTracking.init();

  expect(pageTracking.sendTracking.called).to.be.true;
  expect(pageTracking.sendTracking.calledWithExactly({
    product: 'cap',
    category: 'acessories'
  })).to.be.true;

  pageTracking.sendTracking.restore();
});
