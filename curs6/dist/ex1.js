"use strict";
// Metoda 1 <=> console din browser
// in terminal rulam comanda: node
// apoi global
// appi global.process sau process
//  24+46
// ca sa iesim process.exit() sau Ctrl +C
// Metoda 2 <=> script din browser
// 1. definim o functie
let adunare = (a, b) => {
    return a + b;
};
let adunare2 = function (a, b) {
    return a + b;
};
function suma(a, b) {
    return a + b;
}
// 2. apelam functia
console.log("Suma dintre 24 si 46 este", adunare(24, 46));
// 3. in terminal rulam comanda: node ex1.js sau nodemon ex1.js daca modulul nodemon este instalat
//# sourceMappingURL=ex1.js.map