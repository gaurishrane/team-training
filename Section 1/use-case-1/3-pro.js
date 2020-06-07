/**
 * Pro function
 * User Gard Clause
 * @param {*} number 
 */
function numberToAccountingString(number) {
    if (number == null) return
    if (number < 0) return `${Math.abs(number)}`;
    return number.toString();
}

console.log(numberToAccountingString(0));
console.log(numberToAccountingString(10));
console.log(numberToAccountingString(-15));
console.log(numberToAccountingString(undefined));