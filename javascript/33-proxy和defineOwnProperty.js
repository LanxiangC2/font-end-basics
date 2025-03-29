const obj = {
    a: 1,
    b: 2,
    c: {
        a: 1,
        b: 2,
    }
}


/**
 * 
 * vue2 中只有一个办法 object.defineProperty 来将这个对象的读写变成函数，这样子就可以在里面做一些逻辑处理，比如这里的乘以2。
 */

let v = obj.a;
Object.defineProperty(obj, 'a', {
    get() {
        console.log('getter')
        return v
    },
    set(val) {
        console.log('setter', val)
    }
})

obj.a;
obj.a = 2;
