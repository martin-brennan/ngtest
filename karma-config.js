var utils = require('./karma-utils');

var karmaConfig = {
  basePath: '',

  frameworks: ['mocha', 'chai'],

  plugins: ['karma-mocha',
            'karma-chai',
            'karma-sinon-chai',
            'karma-sinon',
            'karma-traceur-preprocessor',
            'karma-mocha-reporter',
            'karma-coverage'],

  reporters: ['mocha', 'coverage'],

  files: [
    'karma-utils.js',
    {pattern: 'src/**/*.js', included: false},
    'bower_components/traceur/traceur.min.js',
    'bower_components/es6-module-loader/dist/es6-module-loader-sans-promises.js',
    {pattern: 'bower_components/es6-module-loader/dist/es6-module-loader-sans-promises.js.map', included: false},
    'bower_components/system.js/dist/system.src.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/lodash/lodash.min.js',
    'node_modules/sinon/pkg/sinon-1.13.0.js',
    'bower_components/sinon-as-promised/release/sinon-as-promised.js',
    'karma-main.js'
  ],

  preprocessors: {
    'src/**/*.js': ['traceur'],
    'src/**/!(*spec)/*.js': ['coverage']
  },

  port: 9876,

  colors: true,

  traceurPreprocessor: {
    options: {
      outputLanguage: 'es5',
      sourceMaps: true,
      script: false,
      memberVariables: true,
      modules: 'instantiate',
      annotations: true
    },
    resolveModuleName: utils.file2moduleName
  },

  autoWatch: true,

  browsers: ['Chrome'],

  singleRun: false
};


// set up the actual configuration
module.exports = function (config) {
  karmaConfig.logLevel = config.LOG_INFO;
  config.set(karmaConfig);
}