

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
    // Assuming that we are given either AI/User/Hidden Card by type
    constructor(value,suit, type){
        this.value = value; 
        this.suit = suit;
        this.type = type;
        this.element = createCard(suit);
    }

    getSuitImagePath(suit) {
        switch (suit) {
            case "diamond": return "assets/diamond.png";
            case "eart": return "assets/heart.png";
            case "clubs": return "assets/clubs.png";
            case "spades": return "assets/spades.png";
            default:
        }
    }

    getCardElementIDs(type) {
        return {
            suitID: `card-suit-${type}`,
            numberID: `card-number-${type}`
        };
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'card';
        let imgPath = this.getSuitImagePath(this.suit);
        const { suitID, numberID } = this.getCardElementIDs(this.type);

        if (this.type != "hidden") {
            card.innerHTML = `
                <div class="top-left-label">
                        <h2 class="card-number" id="${numberID}>${this.value}</h2>
                        <img class="card-suit" id="${suitID}" src=${imgPath}> 
                        </div>
                <div class="bottom-right-label">
                        <img class="card-suit" id="${suitID}" src=${imgPath}> 
                        <h2 class="card-number" id="${numberID}">${this.value}</h2>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="hiddencard" id="hidden-card">
                    <img src="assets/hiddencard.png" alt="Hidden Card" class="hidden-card-image">
                </div>
            `;
        }
        

        return card;
    }

    flip(){
        this.element.classList.toggle("flipped");
    }
}


