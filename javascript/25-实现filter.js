const arr = [1, 3, 4, ,5]
const arr2 = [1, 8, 9]


Array.prototype.filter = function (callback, argThis) {
    if (this === null || this === undefined) {
        throw new TypeError("Can not read property 'filter' of null or undefined!")
    }

    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError('callback is not a function!')
    }
    const t = argThis;
    const o = Object(this);
    const len = o.length >>> 0;

    const res = [];

    for (let i = 0; i < len; i++) {

        if( i in  o) {
            const valid = callback.call(t, o[i], i, o);
            // 或者不用 push 方法，直接用指针 往res中添加
            if (valid) { res.push(o[i]) }
        }
    }

    return res;
    
}

// 测试
// 请注意不要写成箭头函数，箭头函数里边的 this 在定义的时候捕获上下文环境作为 this，这会导致第二个参数是无效的
const res = arr.filter(function (item) {
    return item > 3
}, arr2)
console.log(res)