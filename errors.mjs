// Long error messages clutter up class logic. Therefore I define methods here to generate
// the error rather than hardcoding it in the class itself.

export const arrayRequired = cards =>
  new TypeError(
    `Deck must be initialized with an array but received ${typeof cards}`
  );

export const fiftyThreeRequired = cards =>
  new RangeError(
    `Deck class expects to be initialized with an array length 53 but received an array of length ${cards.length}`
  );

export const requiresDeck = deck =>
  new TypeError(
    `Input of Deck equals method requires an instance of Deck but received ${Object.getPrototypeOf(
      deck
    )}`
  );
