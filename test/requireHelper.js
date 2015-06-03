module.exports = function (path) {
  return require((process.env.COVERAGE_PATH || '../src/') + path);
};