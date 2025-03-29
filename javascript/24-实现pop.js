

const arr = []

Array.prototype.pop = function () {
    if (this === undefined || this === null) {
        throw new TypeError("Can not read property 'pop' of undefined or null!")
    }

    const o = Object(this);
    const len = o.length >>> 0;

    // 考虑数组为空的情况
    if (!len) {
        return undefined;
    }

    const removeItem = o[len - 1];

    delete o[len - 1]
    // 更新 o.length 因为 this(arr) 和 o 具有关联性
    o.length = len - 1;
    return removeItem;
}

console.log(arr.pop())
console.log(arr)