const fibonacciRecursive = (n) => {

    let a = 0, b = 1;
    const res = [a, b];
    if (n === 0) return a;
    if (n === 1) return b;

    for (let i = 2; i < n; i++) {
        [a, b] = [b, a+b]
        res.push(b);
    }

    return res;


}


console.log(fibonacciRecursive(10))