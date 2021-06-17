import Deck from "./Deck.mjs";
import { loggingRequested, logIteration } from "./utils.mjs";

const originalDeck = new Deck();
let finalDeck = originalDeck.shuffle();

// Start the shuffle counter at 1 because finalDeck is initialized as the first shuffle
let shuffleCount = 1;

if (loggingRequested) logIteration(0, originalDeck);

while (!originalDeck.equals(finalDeck)) {
  if (loggingRequested) logIteration(shuffleCount, finalDeck)
  finalDeck = finalDeck.shuffle();
  shuffleCount += 1;
}

if (loggingRequested) logIteration(shuffleCount, finalDeck)

console.info(
  `Total number of shuffles to return to original state: ${shuffleCount}`
);
