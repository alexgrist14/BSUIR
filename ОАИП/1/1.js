// const formula = (x,n) =>{
//     let sum = 0;
//     for(let k = 1; k<=n; k++){
//         let numerator = Math.exp((2/3)-k);
//         let denominator = Math.sqrt(Math.pow(x,k)+ Math.pow(x,2*k-1));
//         sum += numerator/denominator;
//     }
//     return Math.cbrt(1 + Math.pow(Math.sin((Math.PI*x)/n)),2)  * sum;
// }

// let n = 10;
// for(let x = 0.6; x<= 1.1; x+=0.25){
//     console.log(`n=${n} x=${x} f=${formula(x,n)}`);
//     n++;
// }


function calculateExpression(x, n) {
    let sum = 0;

    for (let k = 1; k <= n; k++) {
        let numerator = Math.exp((2 / 3) - k);
        let denominator = Math.sqrt(Math.pow(x, k) + Math.pow(x, 2 * k - 1));
        sum += numerator / denominator;
    }

    let result = Math.cbrt(1 + Math.pow(Math.sin((Math.PI * x) / n), 2) * sum);
    return result;
}

let n = 10;
let x = 0.6

while(n <=15){
    console.log(`n=${n} x=${x} f=${calculateExpression(x,n)}`);
    x+=0.25;
    if(x > 1.1){
        x = 0.6;
        n++;
    }
}