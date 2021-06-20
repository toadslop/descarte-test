import Deck from "./Deck.mjs";
import {
  loggingRequested,
  logShuffle,
  shuffleCounter,
  logResult,
  event,
  until,
} from "./utils.mjs";
import { SHUFFLE } from "./constants.mjs";

if (loggingRequested()) event.on(SHUFFLE, logShuffle);

const originalDeck = new Deck();

let finalDeck = originalDeck.shuffle();

until(
  () => originalDeck.equals(finalDeck),
  () => (finalDeck = finalDeck.shuffle())
);

logResult(finalDeck, shuffleCounter);
