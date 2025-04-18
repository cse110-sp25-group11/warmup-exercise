#### For the HTML Team
- We need a shuffle button so that the user can click on when they want to shuffle and trigger the animation


#### For the JS Team
- For the card dealing animation (flipLeftAI etc), we need 4 precise locations for cards that are going to be flipped (AI Left, AI Right, human left, human right), it's better to do this part in JS, so we need the precise locations for the newly dealt cards with this code (ChatGPT spat this code out): 

```
/* Modify the animation for the third card in the deck */
@keyframes flipLeftAI {
  0% {
    transform: translateX(0) translateY(0) rotateY(0);
  }
  50% {
    /* First move to the position of the AI card */
    transform: translateX(calc(50vw - 200px)) translateY(50px) rotateY(0);
  }
  100% {
    /* Keep same position and flip */
    transform: translateX(calc(50vw - 200px)) translateY(50px) rotateY(180deg);
  }
}

/* Add this rule to specify that we want to target the third card in the deck */
.deck-card:nth-child(3) {
  left: 40px;
  z-index: 3;
  
  /* Triggers the animation */
  animation: flipLeftAI 2s forwards;  
  transform-style: preserve-3d;
  transform-origin: center;
}

/* You may also need to modify the AI card position to ensure the animation target position is correct */
.AI-cards {
  position: fixed; 
  top: 50px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 10; /* Ensure it's above other elements */
}

/* Ensure the AI card has a specific size and position */
#AI-card {
  position: relative;
  z-index: 5;
}
```


```
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the elements
  const deckCard = document.querySelector('.deck-card:nth-child(3)');
  const aiCard = document.querySelector('#AI-card');
  
  // Function to position the card
  function positionCard() {
    if (!deckCard || !aiCard) return;
    
    // Get the positions
    const deckRect = deckCard.getBoundingClientRect();
    const aiCardRect = aiCard.getBoundingClientRect();
    
    // Calculate the translation needed
    const translateX = aiCardRect.left - deckRect.left;
    const translateY = aiCardRect.top - deckRect.top;
    
    // Create a keyframe animation dynamically
    const keyframes = `
      @keyframes flipToAICard {
        0% {
          transform: translateX(0) translateY(0) rotateY(0);
        }
        50% {
          transform: translateX(${translateX}px) translateY(${translateY}px) rotateY(0);
        }
        100% {
          transform: translateX(${translateX}px) translateY(${translateY}px) rotateY(180deg);
        }
      }
    `;
    
    // Add the keyframes to the document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    
    // Apply the animation to the card
    deckCard.style.animation = 'flipToAICard 2s forwards';
  }
  
  // Run after a slight delay to ensure elements are rendered
  setTimeout(positionCard, 100);
  
  // Also run on window resize to maintain positioning
  window.addEventListener('resize', positionCard);
});
```