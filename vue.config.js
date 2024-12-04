const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: './src/app/main.ts',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/app/assets/styles/resetStyles.scss'),
        path.resolve(__dirname, './src/app/assets/styles/variables.scss'),
        path.resolve(__dirname, './src/app/assets/styles/typography.scss'),
        path.resolve(__dirname, './src/app/assets/styles/global.scss'),
        path.resolve(__dirname, './src/app/assets/styles/lib/datepicker.scss')
      ]
    }
  }
})
