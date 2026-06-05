module.exports = {
  devServer: {
    proxy: {
       '/api': 'http://localhost:3001',
    },
  },
  webpack: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
};