'use strict';
var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit
  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.module = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
	react: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/react/index.html');
		var expected = grunt.file.read('test/expected/react/index.html');
		test.equal(actual, expected, 'test with react , same index.html');

		test.done();
	},
	react_without_slash: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/react_without_slash/index.html');
		var expected = grunt.file.read('test/expected/react/index.html');
		test.equal(actual, expected, 'test with react without slash at the end of path, same index.html');

		test.done();
	},
	react_wit_multiple_level: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/react_without_slash/index.html');
		var expected = grunt.file.read('test/expected/react/index.html');
		test.equal(actual, expected, 'test with react with a multiple level path output, same index.html');

		test.done();
	}
};