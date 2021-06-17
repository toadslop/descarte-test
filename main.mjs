import Deck from "./Deck.mjs";

const originalDeck = new Deck();
let finalDeck = originalDeck.shuffle();

// Start the shuffle counter at 1 because finalDeck is initialized as the first shuffle
let shuffleCount = 1;

while (!originalDeck.equals(finalDeck)) {
  finalDeck = finalDeck.shuffle();
  shuffleCount += 1;
}

console.info(`Total number of shuffles to return to original state: ${shuffleCount}`);
