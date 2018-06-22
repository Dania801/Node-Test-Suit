const expect = require('chai').expect;
const nock = require('nock');

const getUser = require('../translator/git').getUser;
const response = require('./data/response');

describe('Get User tests', () => {
  // this method is like testing the github api instead of testing our application
  it('Get a user by username', (done) => {
    getUser('octocat')
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Test result of name, company and location for the response
        expect(response.name).to.equal('The Octocat')
        expect(response.company).to.equal('GitHub')
        expect(response.location).to.equal('San Francisco')
        done();
      });
  });
});


describe('Get User tests #2', () => {
  beforeEach(() => {
    nock('https://api.github.com')
      .get('/users/octocat')
      .reply(200, response);
  });

  it('Get a user by username', (done) => {
    getUser('octocat')
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Test result of name, company and location for the response
        expect(response.name).to.equal('The Octocat')
        expect(response.company).to.equal('GitHub')
        expect(response.location).to.equal('San Francisco')
        done();
      });
  });
});
