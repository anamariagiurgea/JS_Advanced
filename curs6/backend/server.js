const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = __dirname; 

const server = http.createServer((req, res) => {
    // Determină calea fișierului cerut (default la index.html pentru adresa '/')
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Extrage extensia fișierului
    const extname = path.extname(filePath).toLowerCase();
    
    // Determină tipul de conținut (MIME type)
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Verifică dacă fișierul există
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Fișierul nu a fost găsit (404)
                res.writeHead(404);
                res.end('Page 404 Not Found');
            } else {
                // Eroare de server (500)
                res.writeHead(500);
                res.end(`Eroare de server: ${error.code}..\n`);
            }
        } else {
            // Trimite conținutul fișierului cu tipul MIME corect
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Serverul Node.js rulează pe http://localhost:${PORT}`);
    console.log(`Puteți accesa quizz-ul aici: http://127.0.0.1:${PORT}`);
});