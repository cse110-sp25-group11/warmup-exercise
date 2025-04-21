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
            cardImg.src = "../../assets/cardBack.png";
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
        switch(value) {
            case 'A':
                this.numericalValue = 11;
                break;
            case '2':
                this.numericalValue = 2;
                break;
            case '3':
                this.numericalValue = 3;
                break;
            case '4':
                this.numericalValue = 4;
                break;
            case '5':
                this.numericalValue = 5;
                break;
            case '6':
                this.numericalValue = 6;
                break;
            case '7':
                this.numericalValue = 7;
                break;
            case '8':
                this.numericalValue = 8;
                break;
            case '9':
                this.numericalValue = 9;
                break;
            case '10':
                this.numericalValue = 10;
                break;
            case 'J':
                this.numericalValue = 10;
                break;
            case 'Q':
                this.numericalValue = 10;
                break;
            case 'K':
                this.numericalValue = 10;
                break;
            default:
                console.warn(`Unknown card value: ${value}`);
                this.numericalValue = 0;
        }
    
    }

    /**
     * Returns the appropriate image path for a given suit.
     */
    getSuitImagePath(suit) {
        switch (suit) {
            case "diamond": return "../../assets/diamond.png";
            case "heart": return "../../assets/heart.png"; // fixed typo
            case "clubs": return "../../assets/clubs.png";
            case "spades": return "../../assets/spades.png";
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
                <img src="../../assets/cardBack.png" alt="Hidden Card" class="hidden-card-image card">
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
let cardAI2 = null;
let aiTotal = 0;
let humanTotal = 0;

    /**
     * check if the game is over, if the human AI lost, or to step down the Ace from 11 to 1
     */
function checkjoever(type){
    if (type == "hit") {
        if (humanTotal > 21) {
            // Need 2 add: reduce Ace from 11 to 1 here before declaring bust
            showOverlay("You busted! AI wins!");
            return ;
        }
        // If both players have stood, check winner
        if (humanTotal == 21) {
            document.querySelector(".stand-button").click(); // Trigger stand button
            return ;
        }
    }
    if (type == "stand") {
        if (aiTotal > 21) {
            showOverlay("AI busted! You win!");
            return ;
        }
        if (aiTotal > humanTotal) {
            showOverlay("AI wins!");
            return ;
        } else if (aiTotal < humanTotal) {
            showOverlay("You win!");
            return ;
        } else {
            showOverlay("It's a tie!");
            return ;
        }
    }
    return ;
}

function showOverlay(message) {
    const overlay = document.getElementById("overlay");
    overlay.querySelector(".message").textContent = message;
    overlay.classList.remove("hidden");
}

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
                newCardBack.src = "../../assets/cardBack.png";
                newCardBack.className = "deck-card card";
                deckCont.insertBefore(newCardBack, deckCont.firstChild);

                resolve();
            }, 2500);

        }, 1200);
    });
}

function updateCounter(id, newValue) {
    const counter = document.getElementById(id);
    if (counter) {
        counter.querySelector("p").textContent = newValue;
    }
}

function resetGame() {
    const playButton = document.querySelector(".playbutton");
    if (playButton) {
        playButton.click(); // Simulate the play button being clicked
    }
}


document.querySelector(".playbutton").addEventListener("click", async () => {
    const AICont = document.querySelector(".AI-cards");
    const humCont = document.querySelector(".human-cards");
    const hitButton = document.querySelector(".hit-button");
    const standButton = document.querySelector(".stand-button");
    const playButton = document.querySelector(".playbutton");

    playButton.style.display = "none";

    overlay.classList.add("hidden");

    // Disable buttons
    hitButton.disabled = true;
    standButton.disabled = true;
    playButton.disabled = true;

    AICont.innerHTML = ""; // Clear previous cards
    humCont.innerHTML = ""; // Clear previous cards



    const cardAI1 = deck.pickCard();
    cardAI2 = deck.pickCard();
    const cardHum1 = deck.pickCard();
    const cardHum2 = deck.pickCard();
    updateCounter("counter-AI",0);
    updateCounter("counter-human",0);
    aiTotal = 0;
    humanTotal = 0;

    if (cardAI1 && cardAI2) {
        await drawCardWithAnimation(AICont, cardAI1, "flipLeftAI");
        aiTotal = cardAI1.numericalValue;
        updateCounter("counter-AI",aiTotal);
        await drawCardWithAnimation(AICont, cardAI2, "flipLeftAI");
        cardAI2.flip();
    }

    if (cardHum1 && cardHum2) {
        await drawCardWithAnimation(humCont, cardHum1, "flipLeftHuman");
        humanTotal += cardHum1.numericalValue;
        updateCounter("counter-human", humanTotal);
        await drawCardWithAnimation(humCont, cardHum2, "flipRightHuman");
        humanTotal += cardHum2.numericalValue;
        updateCounter("counter-human", humanTotal);
        checkjoever();
    }

    // Re-enable buttons after animations are complete
    hitButton.disabled = false;
    standButton.disabled = false;
    playButton.disabled = false;

});


document.querySelector(".hit-button").addEventListener("click", async () => {
    const hitButton = document.querySelector(".hit-button");
    const standButton = document.querySelector(".stand-button");
    const playButton = document.querySelector(".playbutton");

    // Disable buttons
    hitButton.disabled = true;
    standButton.disabled = true;
    playButton.disabled = true;

    const drawedCard = deck.pickCard();
    if (drawedCard) {
        const humCont = document.querySelector(".human-cards");
        await drawCardWithAnimation(humCont, drawedCard, "flipLeftHuman");
        humanTotal += drawedCard.numericalValue;
        updateCounter("counter-human", humanTotal);
    }

    checkjoever("hit");


    // Re-enable buttons after animations are complete
    hitButton.disabled = false;
    standButton.disabled = false;
    playButton.disabled = false;
});



document.querySelector(".stand-button").addEventListener("click", async () => {
    const AICont = document.querySelector(".AI-cards");
    const hitButton = document.querySelector(".hit-button");
    const standButton = document.querySelector(".stand-button");
    const playButton = document.querySelector(".playbutton");

    // Disable buttons
    hitButton.disabled = true;
    standButton.disabled = true;
    playButton.disabled = true;

    // Flip the initially faced-down card
    cardAI2.flip();
    aiTotal += cardAI2.numericalValue;
    updateCounter("counter-AI", aiTotal);

    // AI's turn
    while (aiTotal < 17) {
        const drawedCard = deck.pickCard();
        if (drawedCard) {
            await drawCardWithAnimation(AICont, drawedCard, "flipLeftAI");
            aiTotal += drawedCard.numericalValue;
            updateCounter("counter-AI", aiTotal);
        }
    }

    checkjoever("stand");

    // Re-enable buttons after animations are complete
    hitButton.disabled = false;
    standButton.disabled = false;
    playButton.disabled = false;
});

