const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();


// 1) Proxy /api/* to the Django backend running at http://localhost:8000
app.use('/api', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));


// 2) Serve the React build from /frontend/build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));


// All other requests serve index.html (SPA)
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));