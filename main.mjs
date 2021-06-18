import Deck from "./Deck.mjs";
import {
  loggingRequested,
  logShuffle,
  shuffleCounter,
  logResult,
  event,
} from "./utils.mjs";
import { SHUFFLE } from "constants.mjs";

// Listener to handle logging
if (loggingRequested()) event.on(SHUFFLE, logShuffle);

// Initialize original deck as new instance of Deck class.
const originalDeck = new Deck();

// Initialize finalDeck with call the shuffle method, which implements the requested algorithm.
let finalDeck = originalDeck.shuffle();

// Keep shuffling until finalDeck equals originalDeck.
while (!originalDeck.equals(finalDeck)) {
  finalDeck = finalDeck.shuffle();
}

logResult(finalDeck, shuffleCounter);
