// This class manages operations for the deck

export default class Deck {
  // The constructor generates a new deck or accepts an array as a deck
  constructor(cards = Deck.genDeck()) {
    if (!Array.isArray(cards))
      throw new TypeError(`Deck must be initialized with an array but received ${typeof cards}`);
    if (cards.length !== 53)
      throw new RangeError(
        `Deck class expects to be initialized with an array length 53 but received an array of length ${cards.length}`
      );

    this._cards = cards;
  }

  // Shuffles the deck and returns a new deck.
  shuffle() {
    const [lowerHalf, upperHalf] = this.split();
    return new Deck(Deck.zip(lowerHalf, upperHalf));
  }

  // Helper method used for shuffling. Splits deck in half.
  // Reverses for convenience in shuffling.
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
    if (!(deck instanceof Deck))
      throw new TypeError(
        `Input of Deck equals method requires an instance of Deck but received ${Object.getPrototypeOf(deck)}`
      );
    return (
      this.count === deck.count &&
      this.cards.every((card, index) => card === deck.cards[index])
    );
  }
}
