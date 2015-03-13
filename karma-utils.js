/**
 * Change the file names to module names
 * so they can be loaded correctly using
 * system.js
 *
 * @param {string} filePath - The path to the module to load.
 */
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')

    // module name should be relative to bulds/debug/app folder
    .replace(/.*\/src\//, '')

    // module name should not have a suffix
    .replace(/\.\w*$/, '');
}