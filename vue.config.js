const Version = new Date().getTime();

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 75,
            propList: ['*'],
            exclue: ['node_modules'],
            unitPrecision: 2
          })
        ]
      }
    },

  },
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/dqm-dataquality-management-ui/'
  //   : '/',
  outputDir: "dist",
  devServer: {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/portal-admin-api': {
        target: process.env.VUE_APP_BASEURL,
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        secure: false,
        ws: true,
      },
      '/mocs-tenant': {
        target: process.env.VUE_APP_TENANTURL,
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        secure: false,
        ws: true,
      },
    }
  },
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】

      filename: `js/[name].${Version}.js`,
      chunkFilename: `js/[name].${Version}.js`
    }
  },
}