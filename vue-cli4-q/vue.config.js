module.exports = {
  configureWebpack: {
      resolve: {
        alias: {
          'assets': '@/assets',
          'components': '@/components',
          'views': '@/views',
          'utils':'@/utils',
          'store':'@/store'
        }
      }
    },
  devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
         warnings: true,
         errors: true
        },
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
        proxy: {
                '/api': {  //api代替target
                    target: 'http://localhost:5000',
                    changeOrigin: true,
                    ws: true,
                    pathRewrite: {
                        "^/api":""
                    }
                }
            }
        }
}
