import eslint from 'rollup-plugin-eslint';
import buble from 'rollup-plugin-buble';
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'


export default {
  entry: 'src/main.js',
  dest: 'build/todo-bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    resolve({
      jsnext: true,
      browser: true
    }),
    buble({
      exclude: 'node_modules/**'
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**'
      ]
    }),
    globals(),
    // replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    })
  ]
};