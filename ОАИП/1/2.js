function isPalindrome(num) {
    const str = num.toString();
    return str === str.split('').reverse().join('');
}

function reverseNumber(num) {
    return parseInt(num.toString().split('').reverse().join(''), 10);
}

function makePalindrome(n) {
    let steps = 0;
    while (!isPalindrome(n)) {
        let reversed = reverseNumber(n);
        n += reversed;
        steps++;
        console.log(`Шаг ${steps}: число = ${n}`);
    }
    return n;
}

const N = 89;
const result = makePalindrome(N);
console.log(`Результат: палиндром = ${result}`);
