

class Deck {
    
    constructor(){
        this.cardsdrawn = []; // Declare empty array of cards that have not been drawn
    }


    // Pick a random card that has not been choosen 
    pickCard(){
        getRandomInt(3); // pick random number 0-3 for suit
        getRandomInt(12); // pick random number 0-12 for number

    }
}

class Card {

    constructor(value,suit){
        this.value = value;
        this.suit = suit;
    }

    flip(){

    }
}


