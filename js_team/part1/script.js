

class Deck {
    
    /**
     * Create a deck of 52 cards
     */
    constructor(){
        this.cards = []; 
        this.element = null;
        this.initialize();
        this.createDeckElement();
    }

    /**
     * Initialize deck with 52 cards
     */
    initialize() {
        this.cards = []; // clear if any existing cards
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
     * Creates DOM element representing the deck
     */
    createDeckElement() {
        this.element = document.createElement('div');
        this.element.className = 'deck';

        // deck image for back of cards
        const deckImage = document.createElement('img');
        deckImage.src = '../assets/hiddencard.png';
        deckImage.alt = 'Card Deck'
        deckImage.className = 'deck-image';

        this.element.appendChild(deckImage);

        return this.element;
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

    shuffle() {
        this.animateShuffle().then(() => {
            this.performShuffle();
        })
    }

    performShuffle(){

    } // fisher-yates
    
    /**
     * 
     * @param {HTMLElement} container - container to render deck in
     */
    render(container){
        if(container) {
            container.append(this.element);
        } else { 
            console.warn("No container provided to render deck");
        }
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
            case "diamond": return "../assets/diamond.png";
            case "heart": return "../assets/heart.png"; // fixed typo
            case "clubs": return "../assets/clubs.png";
            case "spades": return "../assets/spades.png";
            default: return "../assets/hiddencard.png"; // fixed typo
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
        card.className = (this.type === "hidden") ? 'hiddencard' : 'card-open-card';

        const imgPath = this.getSuitImagePath(this.suit);
        const { suitID, numberID, cardID } = this.getCardElementIDs(this.type);
        card.id = cardID;

        
        /**
         * Each card will have the <img> tag(s) for the suits and the back of the card
         *  This way, we can just toggle whether or not the card is hidden (show back) or not
         */ 
        card.innerHTML = `
            <div class="top-left-label">
                <h2 class="card-number" id="${numberID}">${this.value}</h2>
                <img class="card-suit" id="${suitID}" src="${imgPath}" />
                <img src="${imgPath}" alt="Hidden Card" class="hidden-card-image" />
            </div>
            <div class="bottom-right-label">
                <img class="card-suit" id="${suitID}" src="${imgPath}" />
                <h2 class="card-number" id="${numberID}">${this.value}</h2>
                <img src="${imgPath}" alt="Hidden Card" class="hidden-card-image" />
            </div>
        `;

        return card;
    }

    /**
     * Flips the card by setting the card as hiddencard
     */
    flip() {
        if (this.element.classList.contains("card-open-card")) {
            this.element.classList.remove("card-open-card");
            this.element.classList.add("hiddencard");
        } else {
            this.element.classList.remove("hiddencard");
            this.element.classList.add("card-open-card");
        }
    }
}

// const deck = new Deck();
// deck.createDeckElement();
// const container = document.querySelector('.deck');
// deck.render(container);

// document.querySelector(".playbutton").addEventListener("click", () => {
//     const pickedCard = deck.pickCard();
//     if (pickedCard) {
//         // Render two cards on each play mat (User and Dealer)
//     }
// });

// document.querySelector(".hit-button").addEventListener("click", () => {
//     const pickedCard = deck.pickCard();
//     if (pickedCard) {
//        // Render the card where its supposed to go (User) end
//     } else {
//         console.log("No more cards left!");
//     }
// });
