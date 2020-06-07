const readline = require('readline');
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


readlineInterface.question('Enter your name :', name => {
    readlineInterface.question('Enter your middle :', middle => {
        readlineInterface.question('Enter your last :', last => {
            readlineInterface.question('Your motto :', motto => {

                console.log(`\nWelcome ${name} ${middle} ${last} \nAnd I Say '${motto}'`);
                readlineInterface.close();
            })
        })
    })
});