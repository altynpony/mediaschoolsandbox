const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Proxy /sandbox/* to MediaSchool backend on port 3001
app.use('/sandbox', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/sandbox': '', // Remove /sandbox prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[SANDBOX] Proxying: ${req.method} ${req.originalUrl} -> http://localhost:3001${req.url}`);
  }
}));

// Proxy everything else to your existing project on port 3002
app.use('/', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[MAIN] Proxying: ${req.method} ${req.originalUrl} -> http://localhost:3002${req.url}`);
  }
}));

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
  console.log(`📍 Routes:`);
  console.log(`   https://vast.mediaschool.ai/         -> http://localhost:3002 (existing project)`);
  console.log(`   https://vast.mediaschool.ai/sandbox/ -> http://localhost:3001 (MediaSchool)`);
});