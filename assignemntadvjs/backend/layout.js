const fs = require('fs');

/**
 * Randarează un fișier HTML template, inserând un conținut dinamic.
 * @param {string} pageName Numele fișierului HTML (ex: 'index.html').
 * @param {string} content Conținutul HTML de inserat (ex: un mesaj de rezultat).
 * @returns {string} Conținutul HTML complet.
 */
function renderPage(pageName, content) {
    try {
        let template = fs.readFileSync(pageName, 'utf8');
        // Inserează conținutul în placeholder-ul {{content}}
        return template.replace('{{content}}', content);
    } catch (error) {
        console.error(`Eroare la citirea fișierului ${pageName}:`, error);
        return `<h1>Eroare la încărcarea paginii.</h1><p>${error.message}</p>`;
    }
}

module.exports = { renderPage };
