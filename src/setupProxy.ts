const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/auth/signup',
        createProxyMiddleware({
            target: 'http://localhost:5000/api/auth/signup',
            changeOrigin: true,
        })
    );
};
