const readline = require('readline');
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function main() {
    const name = await askQuestion(readlineInterface, 'Enter your name :')
    const middle = await askQuestion(readlineInterface, 'Enter your middle :')
    const last = await askQuestion(readlineInterface, 'Enter your last :')
    const motto = await askQuestion(readlineInterface, 'Your motto :')

    console.log(`\nWelcome ${name} ${middle} ${last} \nAnd I Say '${motto}'`);
    readlineInterface.close();
}

main();

function askQuestion(readlineInterface, question) {
    return new Promise(resolve => {
        readlineInterface.question(question, answer => {
            resolve(answer);
        })
    })
}