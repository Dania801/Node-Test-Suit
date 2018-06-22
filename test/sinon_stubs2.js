const sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var PubSub = require('pubsub-js');


it('Tests an async stub', function() {
  stub = sinon.stub();
  stub.withArgs('Dania')
    .onFirstCall().returns('Hello Dania')
    .onSecondCall().returns('Second call');
  stub.withArgs(10).throws('ERROR: Numbers aren\'t all allowed!');
  stub.onCall(2).returns('third call');
  expect(stub('Dania')).to.equal('Hello Dania');
  expect(stub('Dania')).to.equal('Second call');
  expect(stub('XX')).to.equal('third call');
  stub.resetBehavior();
  stub.resetHistory();
  stub.reset(); // reset both behaviour and history

});

it('Tests fake calls', function() {
  var myObj = {};
  myObj.prop = function propFn() {
      return 'foo';
  };
  sinon.stub(myObj, 'prop').callsFake(function fakeFn() {
    return 'boo';
  });
  expect(myObj.prop()).to.equal('boo');
})

it('Tests setter and getter', function() {
  var myObj = {
      example: 'oldValue',
      prop: 'foo'
  };
  sinon.stub(myObj, 'prop').set(function setterFn(val) {
      myObj.example = val;
  });
  myObj.prop = 'baz';
  expect(myObj.example).to.equal('baz');
})
