const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

const server = http.createServer((req, res) => {
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? './index.html' : `.${req.url}`);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 - Fișierul nu a fost găsit');
      } else {
        res.writeHead(500);
        res.end(`Eroare server 500`);
      }
    } else {
      //  am adautat  linii pentru  fișiere  de datw pt browser 
      let ext = path.extname(filePath);
      let contentType = 'text/html';
     if (ext === '.js') contentType = 'application/javascript';
     if (ext === '.json') contentType = 'application/json';
    
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  
  console.log( 'Accesează aplicația la: http://localhost:8080');
  
});
