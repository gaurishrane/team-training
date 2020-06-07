/**
 * its convert number to string
 * @param {number} number it just take number
 */
function numberToAccountingString(number) {
    if (number != null) {
        if (number < 0) {
            return `(${Math.abs(number)})`;
        } else {
            return number.toString();
        }
    }
}

console.log(numberToAccountingString());
console.log(numberToAccountingString(10));
console.log(numberToAccountingString(-15));
console.log(numberToAccountingString(undefined));