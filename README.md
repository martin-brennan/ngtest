# ngtest

An example of an Angular unit testing setup with Karma, Mocha, Chai, Sinon and ES6 compilation using Traceur

See the blog post at [http://www.martin-brennan.com/mocks-stubs-and-injections-unit-testing-in-angular-js](http://www.martin-brennan.com/mocks-stubs-and-injections-unit-testing-in-angular-js) for more information.

## Usage

Run `bower install` and `npm install` to get the dependencies. Then, run `npm test`, which runs `./node_modules/.bin/karma start karma-config.js` to run the tests. You will need to open chrome on `http://localhost:9876/` for the tests to run. The code coverage report will be generated in the coverage folder.