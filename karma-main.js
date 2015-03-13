// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

// Load system.js files relative to this path (this is the test path).
System.baseURL = '/base/src/';

// Import all the specs, and kick off Karma.
console.log('Using test files:');
_.forEach(_.keys(window.__karma__.files), function(file) {
  if (onlySpecFiles(file)) {
    console.log(" ->" + file.substr(file.lastIndexOf('/') + 1, file.length - file.lastIndexOf('/')));
  }
});
Promise.all(
  Object.keys(window.__karma__.files) // All files served by Karma.
  .filter(onlySpecFiles)              // Only _spec.js files.
  .map(window.file2moduleName)        // Normalize paths to module names.
  .map(function(path) {
    return System.import(path).then(function(module) {  }); // import all required files.
  })).then(function() {
    __karma__.start();
  }, function(error) {
    console.error(error.stack || error)
    __karma__.start();
});

/**
 * Checks the path to see if it is a spec file (_spec.js).
 * @param {string} path - The file path to check for _spec.js suffix.
 */
function onlySpecFiles(path) {
  return /_spec\.js$/.test(path);
}