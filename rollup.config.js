import eslint from 'rollup-plugin-eslint';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

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
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    buble({
      exclude: 'node_modules/**'
    })
  ]
};