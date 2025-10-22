const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const VERSION = process.env.VERSION || 'v1';

// simple endpoint to show version and a timestamp
app.get('/', (req, res) => {
  res.json({
    service: 'k8s-microservice',
    version: VERSION,
    now: new Date().toISOString(),
    host: require('os').hostname()
  });
});

// health check endpoints
app.get('/healthz', (req, res) => res.send('ok'));
app.get('/readyz', (req, res) => res.send('ready'));

const server = app.listen(port, () => {
  console.log(`Listening on ${port}, version=${VERSION}`);
});

// graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received: shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
});
