class Carte {
    constructor(titluCarte, autorCarte, edituraCarte, anCarte, pretCarte) {
        this.titlu = titluCarte;
        this.autor = autorCarte;
        this.editura = edituraCarte;
        this.an = anCarte;
        this.pret = pretCarte;
    }
    obtineTitlu(){
        console.log(`Titlul cartii este ${this.titlu}`)
    }
    afiseazaInfo(){
        return `Detalii despre aceasta carte sunt: ${this.titlu}, ${this.autor}, ${this.pret}`;
    }
    deschidCartea() {
        console.log('Am deschis cartea la pagina 15');
    }
    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


}

export { Carte };