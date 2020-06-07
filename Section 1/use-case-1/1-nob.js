/**
 * Nob
 * @param {convertString} n 
 */
function toAccounting(n) {
    if (n < 0) {
        return '(' + Math.abs(n) + ')';
    } else {
        return n;
    }
}

console.log(toAccounting(0));
console.log(toAccounting(10));
console.log(toAccounting(-15));
console.log(toAccounting(undefined));