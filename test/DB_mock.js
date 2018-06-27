process.env.NODE_ENV = 'test';

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
require('sinon-mongoose');

let Book = require('../app/models/book');

describe.only('User model', function() {
  it('should create a new book', function(done) {
    const book = new Book({
      title: "Robin Hood",
      author: "Mark X",
      year: 1954,
      pages: 1170
    });
    const bookMock = sinon.mock(book);
    const theBook = bookMock.object;

    bookMock
      .expects('save')
      .yields(null);

    theBook.save((err) => {
      bookMock.verify();
      bookMock.restore();
      expect(err).to.be.null;
      done();
    });
  });

  it('should return error if book isn\'t created', function(done) {
    const book = new Book({
      title: "Robin Hood",
      author: "Mark X",
      year: 1954,
      pages: 1170
    });
    const bookMock = sinon.mock(book);
    const theBook = bookMock.object;
    const expectedError = {
      name: 'ValidationError'
    };

    bookMock
      .expects('save')
      .yields(expectedError);

    theBook.save((err, result) => {
      bookMock.verify();
      bookMock.restore();
      expect(err.name).to.equal('ValidationError');
      expect(result).to.be.undefined;
      done()
    });
  });

  it('should removes a created book', function(done) {
    const bookMock = sinon.mock(Book);
    const expectedResult = {
      nRemoved: 1
    };
    bookMock
      .expects('remove')
      .withArgs({ _id: '5700a128bd97c1341d8fb365' })
      .yields(null, expectedResult);

    Book.remove({ _id: '5700a128bd97c1341d8fb365' }, (err, result) => {
      bookMock.verify();
      bookMock.restore();
      expect(err).to.be.null;
      expect(result.nRemoved).to.eq(1);
      done();
    })
  });

  it('should find a book by id', function(done) {
    const bookMock = sinon.mock(Book);
    const expectedBook = {
      title: 'Robin Hood',
     author: 'Mark X',
     year: 1954,
     pages: 1170,
     _id: '5b338ce1c738135a231142e2',
     createdAt: '2018-06-27T13:10:57.184Z'
   };

   bookMock
    .expects('findOne')
    .withArgs({ _id: '5b338ce1c738135a231142e2' })
    .yields(null, expectedBook);

   Book.findOne({ _id: '5b338ce1c738135a231142e2' }, (err, result) => {
     bookMock.verify();
     bookMock.restore();
     expect(result.title).to.equal('Robin Hood');
     expect(result.author).to.equal('Mark X');
     done();
   });
   
  });
});
