import { shuffleCounter, event, split, zip } from "./utils.mjs";
import { arrayRequired, fiftyThreeRequired, requiresDeck } from "./errors.mjs";
import { SHUFFLE } from "./constants.mjs";

export default class Deck {
  // The constructor generates a new deck or accepts an array as a deck
  constructor(cards = Deck.generate()) {
    if (!Array.isArray(cards)) throw arrayRequired(cards);
    if (cards.length !== 53) throw fiftyThreeRequired(cards);
    this._cards = cards;
  }

  // Shuffles the deck and returns a new deck.
  shuffle() {
    event.emit(SHUFFLE, this.cards, shuffleCounter.next().value); // For logging purposes
    const [lowerHalf, upperHalf] = split(this.cards);
    return new Deck(zip(lowerHalf.reverse(), upperHalf.reverse()));
  }

  // Alias for length for purely semantic purposes
  get count() {
    return this.cards.length;
  }

  // This is used for initializing the deck array when no initial deck array is provided
  static generate = () => [...Array(53).keys()].map(i => i + 1);

  // A helper method that allows copying a deck without a reference
  static copy = deck => new Deck([...deck.cards]);

  // Getter method for the cards array.
  get cards() {
    return this._cards;
  }

  // Equality checker for decks.
  equals(deck) {
    if (!(deck instanceof Deck)) throw requiresDeck(deck);
    return (
      this.count === deck.count &&
      this.cards.every((card, index) => card === deck.cards[index])
    );
  }
}
