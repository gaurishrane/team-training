const askQuestion = require('./service/askQuestion');

async function main() {
    try {

        const name = await askQuestion('Enter your name :')
        const middle = await askQuestion('Enter your middle :')
        const last = await askQuestion('Enter your last :')
        const motto = await askQuestion('Your motto :')

        console.log(`\nWelcome ${name} ${middle} ${last} \nAnd I Say '${motto}'`);

    } catch (error) {
        console.error(`Sorry something went wrong: -->`, error.toString());
    }
}

main();