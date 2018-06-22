const assert = require('assert');
let Book = require('../app/models/book');
let mongoose = require('mongoose');

// Direct test on DB

// Describe our tests
describe('Method #2', function(){

  var char;

  before(done => {
    char = new Book({
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      pages: 1170
    });
    char.save().then(function(){
      assert(!char.isNew); // return true when the record is created locally but not saved to db yet
      done();
    });
  })

    it('Finds a record from the db', function(done) {
        Book.findOne({ _id: char._id}, (err, record) => {
          assert(record._id.toString() === char._id.toString());
          done();
        })
    });

  it('Update a record in database', (done) => {
      Book.findOneAndUpdate({ _id: char._id }, { author: 'Hawking' }, (err, record) => {
        assert(record !== null)
        done();
      });
  })


  it('Deletes a record to the database', function(done){
      Book.findOneAndRemove({ _id: char._id }, (err, record) => {
        assert(record !== null);
        done();
      })
  });

});
