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
		test.expect(2);

		var actual = grunt.file.read('test/tmp/react/index.html');
		var actualInfo = grunt.file.read('test/tmp/react/info.json');
		var expected = grunt.file.read('test/expected/react/index.html');
		var expectedInfo = grunt.file.read('test/expected/react/info.json');
		test.equal(actual, expected, 'test with react , same index.html');
		test.equal(actualInfo, expectedInfo, 'test with react , same info.json');

		test.done();
	},
	reactWithoutSlash: function (test) {
		test.expect(2);

		var actual = grunt.file.read('test/tmp/reactWithoutSlash/index.html');
		var actualInfo = grunt.file.read('test/tmp/reactWithoutSlash/info.json');
		var expected = grunt.file.read('test/expected/react/index.html');
		var expectedInfo = grunt.file.read('test/expected/react/info.json');
		test.equal(actual, expected, 'test with react without slash at the end of path, same index.html');
		test.equal(actualInfo, expectedInfo, 'test with react , same info.json');

		test.done();
	},
	reactWithMultipleLevel: function (test) {
		test.expect(2);

		var actual = grunt.file.read('test/tmp/reactMultiple/level/index.html');
		var actualInfo = grunt.file.read('test/tmp/reactMultiple/level/info.json');
		var expected = grunt.file.read('test/expected/react/index.html');
		var expectedInfo = grunt.file.read('test/expected/react/info.json');
		test.equal(actual, expected, 'test with react with a multiple level path output, same index.html');
		test.equal(actualInfo, expectedInfo, 'test with react , same info.json');

		test.done();
	},
    reactWithCustomName: function (test) {
		test.expect(2);

		var actual = grunt.file.read('test/tmp/reactCustomTitle/index.html');
		var actualInfo = grunt.file.read('test/tmp/reactCustomTitle/info.json');
		var expected = grunt.file.read('test/expected/reactCustomTitle/index.html');
		var expectedInfo = grunt.file.read('test/expected/reactCustomTitle/info.json');
		test.equal(actual, expected, 'test with react with a custom tilte (callback), same index.html');
		test.equal(actualInfo, expectedInfo, 'test with react , same info.json');

		test.done();
	}
};