// via https://raw.githubusercontent.com/thisconnect/test-karma-rollup-tape/master/karma.config.js
const buble = require('rollup-plugin-buble');
const nodeResolve = require ('rollup-plugin-node-resolve');
const tapSpec = require('tap-spec');

module.exports = (config) => {
  config.set({
    autoWatch: true,
    // client: { captureConsole: false },
    browsers: [ 'Chrome' ],
    browserConsoleLogOptions: {
      level: 'error',
      format: '%b %T: %m',
      terminal: false
    },
    colors: true,
    files: [
      'lib/tape_browserify.js',
      'test/**/*-test.js'
    ],
    frameworks: ['tap'],
    // logLevel: 'LOG_DEBUG',
    logLevel: config.LOG_ERROR,
    plugins: [
      'karma-rollup-plugin',
      'karma-tap',
      'karma-tap-pretty-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    preprocessors: {
      'test/**/*-test.js': [ 'rollup' ]
    },
    reporters: ['tap-pretty'],
    rollupPreprocessor: {
      // context: 'this',
      external: ['tape'],
      format: 'iife',
      moduleName: 'tape',
      globals: {
        'tape': 'tape'
      },
      plugins: [
        nodeResolve({
          jsnext: true,
          browser: true
        }),
        buble()
      ],
      sourceMap: false // 'inline'
    },
    singleRun: true,
    tapReporter: {
      prettify: tapSpec
    }
  });
};