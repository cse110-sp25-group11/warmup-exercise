

class Deck {
    
    constructor(){
        this.cards = []; 
        const suits = ["diamond", "heart", "clubs", "spades"]; // 4 suites
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; // 13 ranks

        // Generate 52 card objects and store them in the array
        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(value, suit, "hidden"));
            }
        }
    }


    /**
     * Returns random card from deck
     */
    pickCard(){
        // Check if the deck is empty
        if (this.cards.length === 0) {
            return null;  // No cards left
        }
        
        
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        return this.cards.splice(randomIndex, 1)[0];  // Remove and return the card
    }

}

class Card {
    /**
     * @param {string} value - Rank of the card (e.g., A, 2, ... K)
     * @param {string} suit - Suit of the card (heart, spade, etc.)
     * @param {string} type - Card type: "AI", "hum", or "hidden"
     */
    constructor(value, suit, type) {
        this.value = value;
        this.suit = suit;
        this.type = type;
        this.element = this.createCard(); // <-- fixed here
    }

    /**
     * Returns the appropriate image path for a given suit.
     */
    getSuitImagePath(suit) {
        switch (suit) {
            case "diamond": return "assets/diamond.png";
            case "heart": return "assets/heart.png"; // fixed typo
            case "clubs": return "assets/clubs.png";
            case "spades": return "assets/spades.png";
            default: return "assets/hiddencard.png"; // fixed typo
        }
    }

    /**
     * Generates ID strings for different parts of the card based on its type.
     */
    getCardElementIDs(type) {
        return {
            suitID: `card-suit-${type}`,
            numberID: `card-number-${type}`,
            cardID: `${type}-card`
        };
    }

    /**
     * Creates and returns a DOM element representing the card.
     */
    createCard() {
        const card = document.createElement('div');
        card.className = (this.type === "hidden") ? 'hiddencard' : 'card';

        const imgPath = this.getSuitImagePath(this.suit);
        const { suitID, numberID, cardID } = this.getCardElementIDs(this.type);
        card.id = cardID;

        if (this.type !== "hidden") {
            card.innerHTML = `
                <div class="top-left-label">
                    <h2 class="card-number" id="${numberID}">${this.value}</h2>
                    <img class="card-suit" id="${suitID}" src="${imgPath}" />
                </div>
                <div class="bottom-right-label">
                    <img class="card-suit" id="${suitID}" src="${imgPath}" />
                    <h2 class="card-number" id="${numberID}">${this.value}</h2>
                </div>
            `;
        } else {
            card.innerHTML = `
                <img src="${imgPath}" alt="Hidden Card" class="hidden-card-image" />
            `;
        }

        return card;
    }

    /**
     * Flips the card by toggling the 'flipped' class.
     */
    flip() {
        this.element.classList.toggle("flipped");
    }
}

