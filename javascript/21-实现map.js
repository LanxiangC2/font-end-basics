const arr = [1, 2, , 4, 5]
// const arr = []

/**
 *  下边的代码存在几个问题：
 * 1. 覆盖原生 map 方法
 * 2. 未处理 this 指向的问题
 * 3. map 的实现不对，map 还有其他参数的
 */
// Array.prototype.map = function (cb) {
//     const list = this;
//     const res = [];
//     for (let i = 0; i < list.length; i++) {
//         res[i] = cb(list[i])
//     }
//     return res
// }


/**
 * 改进版本：
 *  1. 参数处理更好，考虑到了 map 方法的第二个参数 thisArg 
 *  2. 回调函数参数传递考虑完全
 *  3. 返回值处理正确
 * 存在问题：
 * 1. 未检查 this 是否为数组
 * 2. 未处理稀疏数组，对于 [1, , 3] 这样的稀疏数组，原生 map 会跳过中间的空元素
 * 3. 未处理 length 属性的动态变化, o.length 可能会被动态修改的情况
 */
// Array.prototype.map = function (cb, thisArg) {
//     const T = thisArg;
//     const o = this;
//     const res = [];
//     for (let i = 0; i < o.length; i++) {
//         res[i] = cb.call(thisArg, o[i], i, o)
//     }
//     return res
// }


/**
 * 最终的版本
 */
Array.prototype.map = function (cb, thisArg) {
    // 数组检查
    if (this === null || this === undefined) {
        throw new TypeError(this + 'is null or undefined!')
    }
    // 回调函数检查
    if (Object.prototype.toString.call(cb) !== '[object Function]') {
        throw new TypeError(cb + 'is not a function!')
    }

    const T = thisArg;
    const o = Object(this);
    console.log(o)

    // 获取对象的长度, 由于 Object(this) 的操作，我们必须确保 length 属性符合预期
    // 无符号右移运算符，确保 len 是一个有效的无符号 32 位整数，以满足数组 length 属性的要求。通过这种方式，可以避免因 o.length 的值不符合要求而导致的潜在错误，增强代码的健壮性。
    // 1. 非数字类型的length; [null, undefined, NaN, true, false, '123', 'abc']
    // 2. 负数的 length
    // 3. 超出 32 位整数范围的 length
    const len = o.length >>> 0;

    const res = new Array(len);
    for (let i = 0; i < len; i++) {
        // ？in 表示在原型链查找
        // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
        if (i in o) {
            res[i] = cb.call(thisArg, o[i], i, o)
        }
    }
    return res
}

const result = arr.map((item, idx, raw) => {
    return `${item}-${idx}-${raw.join(',')}`
})
console.log(result)



// console.log(Object.prototype.toString.call([]))
// console.log(Object.prototype.toString.call({}))
// console.log(Object.prototype.toString.call(new Map()))
// console.log(Object.prototype.toString.call(new Set()))
// console.log(Object.prototype.toString.call(new Date()))
// console.log(Object.prototype.toString.call(Math))
// console.log(Object.prototype.toString.call('232'))
// console.log(Object.prototype.toString.call('232'))




