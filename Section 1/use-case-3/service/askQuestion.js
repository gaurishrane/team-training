const readline = require('readline');

function askQuestion(question) {
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise((resolve, reject) => {
        try {
            readlineInterface.question(question, answer => {
                readlineInterface.close();
                resolve(answer);
            })
        } catch (error) {
            reject(error.toString());
            readlineInterface.close();
        }
    })
}

module.exports = askQuestion;