let request = require('supertest');
let Book = require('../app/models/book');
let app = require('../server.js');
const assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

describe('Get', function() {
  it('Should return all books', function(done) {
    request(app)
      .get('/book')
      .expect(200, done);
  });
});

describe('POST', function() {
  it('should post a new book', function(done) {
    let book = {
      title: "The Lordee of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      pages: 1170
    }
    request(app)
      .post('/book')
      .send(book)
      .expect(201)
      .then(res => {
        expect(res.body.book.author).to.equal('J.R.R. Tolkien');
        expect(res.body.book.title).to.equal('The Lordee of the Rings');
        expect(res.body.book.year).to.equal(1954);
        expect(res.body.book.pages).to.equal(1170);
        expect(res.body.book).to.be.defined;
        done();
      });
  });
});

describe('DELETE', function() {
  it('should post a new book', function(done) {
    let book = {
      title: "The Lordee of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      pages: 1170
    }
    request(app)
      .post('/book')
      .send(book)
      .expect(201)
      .then(res => {
        request(app)
          .delete('/book/'+res.body.book._id)
          .expect(200, done);
      });
  });
});

describe('DELETE', function() {
  it('should post a new book', function(done) {
    let book = {
      title: "The Lordee of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      pages: 1170
    }
    request(app)
      .post('/book')
      .send(book)
      .expect(201)
      .then(res => {
        request(app)
          .put('/book/'+res.body.book._id)
          .send({ title: 'Lord of the Rings'})
          .expect(200, done);
      });
  });
});
