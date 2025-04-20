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
 * 
 * 
 * 
 * @param {*} actual 
 * @param {*} expected 
 * @param {*} message 
 */

function assertEquals(actual, expected, message){
    if(actual !== expected){
        console.error("${message} --- Expected: ${expected} --- Got: ${got}");
    }
    else{
        console.log("Test success!");
    }
}

function assertTrue(condition, message){
    if(!condition){
        console.error("${message}");
    }
    else{
        console.log("Matched! --- ${message}");
    }
}

function runAllTests(){
    
}