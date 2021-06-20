import EventEmitter from "events";

// Logging methods
export const loggingRequested = () => process.argv.includes("--with-logging");
export const logShuffle = (cards, count) =>
  console.log(`Current iteration: ${count}\n`, cards, "\n\n");
export const logResult = (finalDeck, counter) => {
  console.info(
    `Total number of shuffles to return to original state: ${counter.next()
      .value}`
  );
  console.info("Final iteration:");
  console.info(finalDeck.cards);
};

// Set up a counter to track number of shuffles
function* counterGenerator() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

export const shuffleCounter = counterGenerator();

// Defined event emitter to track shuffles. It's here to keep the Deck class clean.
export const event = new EventEmitter();

export const split = array => [
  array.slice(0, halfPoint(array)),
  array.slice(halfPoint(array), array.length),
];

const halfPoint = array => Math.floor(array.length / 2 + 1);

export const zip = (lowerHalf, upperHalf) =>
  lowerHalf.flatMap((card, i) => (upperHalf[i] ? [card, upperHalf[i]] : card));

export const until = (condition, execute) => {
  while (!condition()) {
    execute();
  }
};
