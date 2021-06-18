import { shuffleCounter, event } from "./utils.mjs";
import { arrayRequired, fiftyThreeRequired, wrongType } from "./errors.mjs";
import { SHUFFLE } from "constants.mjs";

export default class Deck {
  // The constructor generates a new deck or accepts an array as a deck
  constructor(cards = Deck.genDeck()) {
    if (!Array.isArray(cards)) throw arrayRequired(cards);
    if (cards.length !== 53) throw fiftyThreeRequired(cards);
    this._cards = cards;
    this._shuffleCount = 0;
  }

  // Shuffles the deck and returns a new deck.
  shuffle() {
    event.emit(SHUFFLE, this.cards, shuffleCounter.next().value); // For logging purposes
    const [lowerHalf, upperHalf] = this.split();
    return new Deck(Deck.zip(lowerHalf, upperHalf));
  }

  // Helper method used for shuffling. Splits deck in half.
  // Reverses for convenience in shuffling because we sort
  // by pulling from the top of the deck.
  split = () => [
    this.cards.slice(0, this.halfPoint).reverse(),
    this.cards.slice(this.halfPoint, this.count).reverse(),
  ];

  // Alias for length for purely semantic purposes
  get count() {
    return this.cards.length;
  }

  // Helper method used for splitting the deck
  get halfPoint() {
    return Math.floor(this.count / 2 + 1);
  }

  // This is used for initializing the deck array when no initial deck array is provided
  static genDeck = () => [...Array(53).keys()].map(i => i + 1);

  // A helper method that allows copying a deck without a reference
  static copy = deck => new Deck([...deck.cards]);

  // A helper method for carrying out a shuffle. Takes lower half and upper half and combines them.
  static zip = (lowerHalf, upperHalf) =>
    lowerHalf.flatMap(
      (card, i) => (upperHalf[i] ? [card, upperHalf[i]] : card)
    );

  // Getter method for the cards array.
  get cards() {
    return this._cards;
  }

  // Equality checker for decks.
  equals(deck) {
    if (!(deck instanceof Deck)) throw wrongType(deck);
    return (
      this.count === deck.count &&
      this.cards.every((card, index) => card === deck.cards[index])
    );
  }
}
