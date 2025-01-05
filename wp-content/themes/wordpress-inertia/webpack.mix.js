const mix = require('laravel-mix');
const path = require('path');

// Set public path to a specific directory
mix.setPublicPath('./dist');

// Add path aliases
mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources'),
      '~': path.resolve(__dirname),
      'utilities': path.resolve(__dirname, 'utilities'),
    },
    extensions: ['.*', '.wasm', '.mjs', '.js', '.jsx', '.json'],
  },
  watchOptions: {
    ignored: /dist/,
  },
});

mix
  .js('resources/js/app.js', 'js')
  .react()
  .postCss('resources/css/app.css', 'css', [require('tailwindcss')])
  .version();

// Log the webpack config to verify aliases
mix.dump();
