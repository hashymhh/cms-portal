const http = require('http');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const port = process.env.PORT || 3000;

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  try {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(buildDir, reqPath);

    // Prevent path traversal
    if (!filePath.startsWith(buildDir)) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // fallback to index.html (SPA)
        const indexPath = path.join(buildDir, 'index.html');
        fs.createReadStream(indexPath)
          .on('error', () => {
            res.writeHead(500);
            res.end('Server error');
          })
          .pipe(res);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mime[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`Static server serving ${buildDir} on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down static server');
  server.close(() => process.exit(0));
});
