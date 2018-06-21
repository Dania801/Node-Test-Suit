var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

let Book = require('../app/models/book');

describe('Book model #3', () => {

  var bookObj;

  it('should create a new book', (done) => {
    const book = {
      title: "Robin Hood",
      author: "Mark X",
      year: 1954,
      pages: 1170
    }
    bookObj = new Book(book);
    bookObj.save().then((book) => {
      assert.isDefined(book);
      assert.isObject(book);
      assert.isOk(book);
      assert.isString(book.title);
      assert.isNumber(book.year);
      assert.isNumber(book.pages);
      assert.equal(book.title, 'Robin Hood');
      assert.isAbove(book.year, 1500);
      assert.isNotNull(book.pages);
      assert.isNaN(book.author);
      assert.isDefined(book._id);
      assert.typeOf(book._id, 'object');
      assert.isNotFrozen(book); // cannot have new properties added to it and its existing properties cannot be modified
      assert.isNotSealed(book); // cannot have new properties added to it and its existing properties cannot be removed
      assert.isExtensible(book); // can have new properties added to it
      assert.oneOf(book.year, [1954, 1960]);
      done();
    })
  });

  it('fetches a book', (done) => {
    Book.findOne({ _id: bookObj._id}).then((book) => {
      expect(book).to.be.ok;
      expect(book).to.be.defined;
      expect(book).to.be.an('object');
      expect(book).to.have.property('year').that.is.a('number');
      expect(book).to.have.property('author').that.is.a('string');
      expect(book).to.have.property('pages').that.is.eql(1170);
      expect(book).to.have.property('pages').that.is.above(1000);
      expect(book).to.have.property('year').that.is.not.below(1500);
      expect(book.year).to.be.within(1500,2020);
      expect(book.author).to.match(/Mark X/);
      done();
    })
  })
});
