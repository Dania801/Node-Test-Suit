var sinon = require('sinon');
var fake = sinon.fake();
var chai = require('chai');
var expect = chai.expect;

it('Tests sinon\'s fakers', function(done) {
  fake();
  expect(fake.callCount).to.eq(1);
  fake = sinon.fake.returns('apple pie');
  expect(fake.callCount).to.eq(0);
  expect(fake()).to.equal('apple pie');
  //fake = sinon.fake.throws(new Error('This is not an apple pie'));
  fake = sinon.fake.yields('Hello world');
  fake(console.log); // outputs Hello world

  fake = sinon.fake();
  var cb1 = function() {};
  var cb2 = function() {};
  fake(1,2,cb1);
  expect(fake.callback === cb1).is.true;
  expect(fake.getCall(0).callback === cb1).is.true;

  var date1 = new Date();
  var date2 = new Date();
  fake(1,2, date1);
  expect(fake.lastArg).to.equal(date1);

  // applying fake to the system under Test
  fake = sinon.fake.returns(20);
  sinon.replace(console, 'log', fake);
  expect(console.log('Hello world')).to.equal(20);
  sinon.restore()
  done()
});
