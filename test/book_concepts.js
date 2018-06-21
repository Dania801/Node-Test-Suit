var assert = require('chai').assert;
//var translate = require('../translator/text');


describe('BASICS', () => {
  it('should add numbers', () => {
    assert.equal((1+1), '2');
    assert.strictEqual((1+1), 2); // should have same datatype
    assert.deepEqual((1+1), 2);
  });
});

/*
describe('text module', function() {
    it('should return correct translations from a file', function( done ) {
        translate( __dirname + '/phrases.json', 'es', function(err, data) {
            if (err) { return done( err ); }

            assert.equal( data.length, 3 );
            assert.deepEqual( data, ['hola', 'cervesa', 'I like beer']  );

            done();
        });
    });
});
*/

describe('text module with mock', function() {
  // cache the file
    require('../translator/i18n');
    var i18nOriginal;
    beforeEach(function() {
        // save the original value of the cache
        i18nOriginal = require.cache[ require.resolve('../translator/i18n') ].exports;
        // replace the output of the cache with the foo value
        require.cache[ require.resolve('../translator/i18n') ].exports = function() {
            return 'foo'
        };
    });

    afterEach(function() {
        require.cache[ require.resolve('../translator/i18n') ].exports = i18nOriginal;
    });

    it('should return correct translations from a file', function( done ) {
        var translate = require('../translator/text');
        translate( __dirname + '/phrases.json', 'es', function(err, data) {

            if (err) { return done( err ); }

            assert.equal( data.length, 3 );
            assert.deepEqual( data, ['foo', 'foo', 'foo']  );

            done();
        });
    });
});
