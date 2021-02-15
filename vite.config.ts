const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

// https://vitejs.dev/config/
module.exports = defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require('postcss-discard-comments'),
        require('precss'), // - INCLUDES:
          // - https://github.com/csstools/postcss-extend-rule
          // - https://github.com/jonathantneal/postcss-advanced-variables
          // - https://github.com/csstools/postcss-preset-env
          // - https://github.com/OEvgeny/postcss-atroot
          // - https://github.com/simonsmith/postcss-property-lookup
          // - https://github.com/postcss/postcss-nested
        require('postcss-map-get'),
        require('postcss-calc')({mediaQueries: true}),
        require('postcss-pxtorem')({ propList:['*'], replace:true }),
        require('autoprefixer'),
      ],
    },
  },
})
