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
                this.cards.push(new Card(value, suit, "flipped"));
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
        // const deckImage = document.createElement('img');
        // deckImage.src = '../assets/cardBack.png';
        // deckImage.alt = 'Card Deck'
        // deckImage.className = 'deck-image';

        for (let i = 0; i < 3; i++) {
            const cardImg = document.createElement('img');
            cardImg.src = "../assets/cardBack.png";
            cardImg.className = "deck-card card";
            this.element.appendChild(cardImg);
        }

        // this.element.appendChild(deckImage);
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
            default: 
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
        card.className = `card ${this.type}`; // or any combination

        const imgPath = this.getSuitImagePath(this.suit);
        const { suitID, numberID, cardID } = this.getCardElementIDs(this.type);
        card.id = cardID;

        card.innerHTML = `
            <div class="top-left-label">
                <h2 class="card-number" id="${numberID}">${this.value}</h2>
                <img class="card-suit" id="${suitID}" src="${imgPath}" />
            </div>
            <div class="bottom-right-label">
                <img class="card-suit" id="${suitID}" src="${imgPath}" />
                <h2 class="card-number" id="${numberID}">${this.value}</h2>
            </div>
            <div class="hiddencard" id="hidden-card">
                <img src="../assets/cardBack.png" alt="Hidden Card" class="hidden-card-image card">
            </div>
        `;

        return card;
    }

    /**
     * Flips the card by setting the card as hiddencard
     */
    flip() {
        this.element.classList.toggle("flipped");
    }
}

const deck = new Deck();
deck.createDeckElement();
const container = document.querySelector('.deck');
deck.render(container);


async function drawCardWithAnimation(container, cardObj, flipType) {
    return new Promise((resolve) => {
        const deckCont = document.querySelector('.deck');

        // Reset deck animation 
        deckCont.style.animation = "none";
        deckCont.style.animation = "quickShuffle 0.6s ease-in-out forwards";

        // SetTimeout to allow the shuffle animation to play before drawing card
        setTimeout(() => {
            // Dynamically select the last card in the deck
            const topCard = deckCont.querySelector('.deck-card:last-child');
            if (!topCard) {
                console.warn("No top card found for animation.");
                resolve();
                return;
            }

            // Reset topCard animation to allow for more animations later
            topCard.style.animation = "none";
            topCard.offsetHeight; // Force reflow to reset animation

            // Activates the animation of flipping the card
            setTimeout(() => {
                topCard.style.animation = `${flipType} 2s forwards`;
                cardObj.flip();
            }, 5);

            // Wait for the animation to finish before appending the card to its appropriate destination
            setTimeout(() => {
                container.append(cardObj.element);

                // Add a new card back to the front of the deck
                const newCardBack = document.createElement('img');
                newCardBack.src = "../assets/cardBack.png";
                newCardBack.className = "deck-card card";
                deckCont.insertBefore(newCardBack, deckCont.firstChild);

                resolve();
            }, 2500);

        }, 1200);
    });
}

document.querySelector(".playbutton").addEventListener("click", async () => {

    const cardAI1 = deck.pickCard();
    const cardAI2 = deck.pickCard();
    const cardHum1 = deck.pickCard();
    const cardHum2 = deck.pickCard();

    if (cardAI1 && cardAI2) {
        const AICont = document.querySelector(".AI-cards");

        await drawCardWithAnimation(AICont, cardAI1, "flipLeftAI");
        await drawCardWithAnimation(AICont, cardAI2, "flipLeftAI");
        cardAI2.flip();

    }

    if (cardHum1 && cardHum2) {
        const humCont = document.querySelector(".human-cards");
        await drawCardWithAnimation(humCont, cardHum1, "flippedLeftHuman");
        await drawCardWithAnimation(humCont, cardHum2, "flippedRightHuman");
    }

});