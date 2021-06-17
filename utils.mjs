export const loggingRequested = () => process.argv.includes('--with-logging');
export const logIteration = (count, deck) => {
    console.log(`Current iteration: ${count}`);
    console.log(deck.cards);
    console.log("\n");
}