

const arr = [1, 3, 4]

Array.prototype.push = function (...args) {
    if (this === undefined || this === null) {
        throw new TypeError("Can not read property 'push' of undefined or null!")
    }

    const o = Object(this);
    const len = o.length >>> 0;
    const argsLen = args.length >>> 0;

    
    // 不能超过 js 所能表示的最大数

    if (len + argsLen > Number.MAX_SAFE_INTEGER) {
        throw Error('the length of array is over max value restricted!')
    }
    
    for (let j = 0; j < args.length; j++) {
        o[len + j] = args[j]
    }
    // 更新 o.length 因为 this(arr) 和 o 具有关联性
    o.length = len + args.length;
    return o.length;
}

console.log(arr.push(5, 6))
console.log(arr)