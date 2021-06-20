import { shuffleCounter, event, split, zip } from "./utils.mjs";
import { arrayRequired, fiftyThreeRequired, requiresDeck } from "./errors.mjs";
import { SHUFFLE } from "./constants.mjs";

export default class Deck {
  constructor(cards = Deck.generate()) {
    if (!Array.isArray(cards)) throw arrayRequired(cards);
    if (cards.length !== 53) throw fiftyThreeRequired(cards);
    this._cards = cards;
  }

  shuffle() {
    event.emit(SHUFFLE, this.cards, shuffleCounter.next().value);
    const [lowerHalf, upperHalf] = split(this.cards);
    return new Deck(zip(lowerHalf.reverse(), upperHalf.reverse()));
  }

  get count() {
    return this.cards.length;
  }

  static generate = () => [...Array(53).keys()].map(i => i + 1);

  static copy = deck => new Deck([...deck.cards]);

  get cards() {
    return this._cards;
  }

  equals(deck) {
    if (!(deck instanceof Deck)) throw requiresDeck(deck);
    return (
      this.count === deck.count &&
      this.cards.every((card, index) => card === deck.cards[index])
    );
  }
}
