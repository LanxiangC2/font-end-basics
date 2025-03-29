const a = { a: 1 }

console.log(a instanceof Object)
console.log(Object.getPrototypeOf(a))

const myInstanceOf = (left, right) => {
    if (typeof left !== 'object' || left === null) return false

    let proto = Object.getPrototypeOf(left)

    while (true) {
        if (!proto) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
console.log(myInstanceOf(a, Object))