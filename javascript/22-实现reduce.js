const arr = [1, 3, 4, 5]


/**
 * 实现 reduce
 */

Array.prototype.reduce = function (callback, initVal) {

    // 1. 检查 this
    if (this === null || this === undefined) {
        throw new TypeError(this + 'is undefined or null!')
    }
    // 2. 检查 callback
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(callback + 'is not a function!')
    }

    // 通过 Object(this) 将 this 转换为对象，即使 this 是基本数据类型，
    // 也会将其转换为对应的包装对象（如 Number、String、Boolean），
    // 这样就可以安全地进行后续操作，比如访问对象的 length 属性等。
    // 这里主要是对类数组对象/数组对象，进行统一处理
    const o = Object(this);

    // 确保 len 是 32位以内的整数
    const len = o.length >>> 0;

    let acc = initVal;
    let i = 0;

    if(!acc) {
        // 按照 ecma262 规范，acc 不传，默认取第一个，并且从第二个开始累加，如果为空数组，则抛出错误
        for (; i < len; i++) {
            if (i in o) {
                acc = o[i];
                i++;
                break;
            }
        }
    }

    if (!acc && i === len) {
        throw Error('array can not be empty!')
    }

    for(; i < len; i++) {
        // 数组中有空值的情况，
        if (i in o) {
            acc = callback.call(undefined, acc, o[i], i, o)
        }
    }

    return acc

}


console.log(arr.reduce((acc, cur) => {
    acc += cur
    return acc
}))