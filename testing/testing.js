/**
 * Unit testing for the following functions:
 * 
 * CardConstructor
 * CardFlip
 * 
 * DeckInitialization
 * PickCardReducesDeck
 * 
 * UpdateCounter
 * 
 * Checkjoever
 */

/**
 * Helpers
 * @param {*} actual --> Actual value
 * @param {*} expected --> What's expected
 * @param {*} message --> message to be displayed
 */
function assertEquals(actual, expected, message){
    if(actual !== expected){
        console.error(`${message} --- Expected: ${expected} --- Got: ${actual}`);
    }
    else{
        console.log(`Test success!`);
    }
}

function assertTrue(condition, message){
    if(!condition){
        console.error(`${message}`);
    }
    else{
        console.log(`Matched! --- ${message}`);
    }
}

/**
 * Testing Card Functions
 */
function testCardConstructor(){
    // testing if the card created holds correct value
    const card = new Card("A", "heart", "flipped");
    assertEquals(card.value, "A", "Card stores the right value");
    assertEquals(card.numericalValue, 11, "Ace should have a value of 11");
    assertEquals(card.suit, "heart", "Card has the right value");

    // testing if creates the right DOM element
    const cardDiv = card.element;
    assertTrue(cardDiv instanceof HTMLElement, "Card creats DOM element");
    assertTrue(cardDiv.classList.contains("card"), "Card element as card class");
}

function testCardFlip(){
    const card = new Card("10", "spades", "flipped");

    console.log("Initially flipped:", card.element.classList.contains("flipped"));

    // card should initially be flipped
    card.flip();
    assertTrue(!card.element.classList.contains("flipped"), "Card should remove 'flipped' after 1st toggle");

    card.flip();
    assertTrue(card.element.classList.contains("flipped"), "Card should add 'flipped' after 2nd toggle");
}

/**
 * Testing Deck Functions
 */
function testDeckInitialization(){
    const deck = new Deck();
    assertEquals(deck.cards.length, 52, "Deck should have 52 cards");

    // checking uniqueness of the cards
    const seen = new Set();
    for (const card of deck.cards){
        const id = `${card.value}-${card.suit}`;
        seen.add(id);
    }
    assertEquals(seen.size, 52, "Deck shouid consist of 52 unique cards");
}

function testPickCardReducesDeck(){
    const deck = new Deck();
    const card = deck.pickCard();

    assertTrue(card instanceof Card, "pickCard() should return a Card object");
    assertEquals(deck.cards.length, 51, "Deck should now have 51 cards");
}

/**
 * Testing Counter functions
 */
function testUpdateCounter(){
    const div = document.createElement("div");
    div.id = "counter-human";
    div.innerHTML = "<p>0</p>";
    document.body.appendChild(div);

    updateCounter("counter-human", 17);

    const result = document.querySelector("#counter-human p").textContent;
    assertEquals(result, "17", "updateCounter should update <p> inside the respective <p> tag");
}

/**
 * Testing Win/Lose (Busted)
 */
function testCheckjoeverBusts(){
    // human loses
    window.humanTotal = 22;
    window.aiTotal = 18;

    document.querySelector("#overlay .message").textContent = "";
    checkjoever("hit");

    const msg1 = document.querySelector("#overlay .message").textContent;
    console.log("Overlay message was:", msg1);
    assertTrue(msg1.includes("You busted"), "Should detect when human loses");


    // AI loses
    window.humanTotal = 19;
    window.aiTotal = 22;

    document.querySelector("#overlay .message").textContent = "";
    checkjoever("stand");

    const msg2 = document.querySelector("#overlay .message").textContent;
    console.log("Overlay message was:", msg2);
    assertTrue(msg2.includes("AI busted"), "Should detect when the AI loses");
}

/**
 * Running all tests
 */
function runAllTests(){
    console.log("Starting unit testing...");
    testCardConstructor();
    testCardFlip();
    testDeckInitialization();
    testPickCardReducesDeck();
    testUpdateCounter();
    testCheckjoeverBusts();
    console.log("All tests passed");
}

window.onload = runAllTests;