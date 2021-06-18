# Time Machine Test

## File list
* `main.js` runs the test.
* Logic for the Deck is contained in the Deck class located in `Deck.js`.
* Utility methods are in the `utils.mjs` file. These handle are for logging and counting shuffles.
* `errors.mjs` contains some methods that generate errors for the deck class. This is for keeping the Deck class code clean.
* `constants.mjs` holds a variable containing the string name of the shuffle event for safely sharing the string between files.

For explanations, please refer to the comments in each file.

## Running the Code
Use the commands below to run the test file.
With the `--with-logging` flag you can log the output of each iteration.

**Run command:** `node main.mjs`

**Run with logging:** `node main.mjs --with-logging`

_Note_: I believe the test specification is in error. It provides three iterations: the original deck, then what it says are the first and the second. However, it actually presents the first and the third iterations.
