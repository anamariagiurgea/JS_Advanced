const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); 

const app = express();
const PORT = 3000;


const { renderPage } = require('./layout');

// --- Configurare Middleware Express ---
app.use(cors()); // Permite cereri cross-origin
// body-parser va citi automat datele din formular (URL-encoded)
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser pentru JSON (util dacă ar fi avut și API-uri REST)
app.use(bodyParser.json());

// Aici ar veni rutele definite în ./routes.js, dacă ar fi existat (nu e obligatoriu pentru acest exemplu)
// require('./routes')(app, fs); 

// --- RUTA GET / (Pagina Principală) ---
app.get('/', (req, res) => {
    const html = renderPage('index.html', '');
    // Express setează automat Content-Type: text/html și Status 200 OK
    res.send(html);
});

// --- RUTA POST /rezultat (Procesarea Formularului de Test) ---
app.post('/rezultat', (req, res) => {
    // body-parser a citit datele formularului și le-a plasat în req.body
    const raspunsuri = req.body;

    let punctaj = 0;
    // Verificarea răspunsurilor corecte (4 întrebări)
    if (raspunsuri.q1 === 'd') punctaj++;
    if (raspunsuri.q2 === 'a') punctaj++;
    if (raspunsuri.q3 === 'a') punctaj++;
    if (raspunsuri.q4 === 'a') punctaj++;

    // CORECȚIE: Punctajul maxim este 4, nu 3
    // const mesaj = `<strong>Punctajul tău: ${punctaj}/4</strong>`; 
  let mesaj = "";

if (punctaj === 4) {
  mesaj = `
    <div class="rezultat corect">
      <strong>Punctajul tău: ${punctaj}/4</strong><br>
      Felicitări</div>`;
} else {
  mesaj = `
    <div class="rezultat gresit">
      <strong>Punctajul tău: ${punctaj}/4</strong><br>
      Încearcă din nou! <br>
      <a href="/">Reia testul</a>
    </div>
  `;
}
    // Randam pagina de rezultat folosind template-ul 'despre.html'
    const html = renderPage('despre.html', mesaj);

    res.send(html);
});

// --- Pornire Serverului Express ---
app.listen(PORT, () => {
    console.log(`Serverul rulează la http://localhost:${PORT}`);
    console.log(`Accesează-l în browser: http://localhost:${PORT}`);
});