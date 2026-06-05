/**
 * Craco 配置文件
 * 配置开发服务器代理和其他自定义选项
 */
module.exports = {
  // 开发服务器配置
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  
  // Webpack 配置（可选）
  webpack: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
};