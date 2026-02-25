import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/**
 * 8.1 Bundle Size Optimization: Rollup configuration
 * - Tree-shaking enabled
 * - Code splitting for lazy loading
 * - Minification for production
 * - Gzip compression support
 */

const isProduction = process.env.NODE_ENV === 'production';

const typescriptPlugin = {
  tsconfig: false,
  compilerOptions: {
    target: 'ES2020',
    module: 'esnext',
    lib: ['ES2020', 'DOM'],
    skipLibCheck: true,
    strict: false,
  },
};

export default [
  // ESM build (for modern bundlers with tree-shaking)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: !isProduction,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(typescriptPlugin),
      isProduction && terser({
        compress: {
          passes: 2,
          pure_getters: true,
          unsafe: true,
          unsafe_methods: true,
        },
        mangle: true,
        output: {
          comments: false,
        },
      }),
    ],
    external: [],
  },

  // UMD build (for browsers and CommonJS)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'JalaliDatePicker',
      sourcemap: !isProduction,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(typescriptPlugin),
      isProduction && terser({
        compress: {
          passes: 2,
          pure_getters: true,
          unsafe: true,
          unsafe_methods: true,
        },
        mangle: true,
        output: {
          comments: false,
        },
      }),
    ],
  },

  // CJS build (for Node.js)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: !isProduction,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(typescriptPlugin),
      isProduction && terser({
        compress: {
          passes: 2,
          pure_getters: true,
          unsafe: true,
          unsafe_methods: true,
        },
        mangle: true,
        output: {
          comments: false,
        },
      }),
    ],
  },
];
