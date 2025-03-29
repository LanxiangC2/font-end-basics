
/**
 *  1. bind 可以有多个参数
 *  2. 对于普通函数，绑定 this 指向
 *  3. 对于构造函数，原型链上的原型对象不能丢失
 */
Function.prototype.myBind = function(ctx, ...args) {

    if (typeof this !== 'function') {
        throw new TypeError('element which is trying to be bound is not a callable!')
    }

    const self = this;

    // 加分项！重点！这个函数还可以通过 new 调用，
    const bindFn = function(...args2) {
        const isNewCall = this instanceof bindFn

        return self.apply(
            isNewCall ? this : ctx,
            [...args, ...args2]
        )
    }

    bindFn.prototype = Object.create(self.prototype)

    return bindFn
}




const testObj = {
    a: 1,
    b: 2
}

const testA = {
    a: 10, 
    b: 20,
    bar: function(c) {
        return this.a + this.b + c + "&" + [...arguments]
    }
}

console.log(testA.bar(2, 3))
console.log(testA.bar.bind(testObj, 2)(3))
console.log(testA.bar.myBind(testObj, 2)(3))
/**
 * 测试 new 调用
 */

function orange (name) {
    this.name = name
}
orange.prototype.sayhello = function () {
    console.log(`my name is ${this.name}`)
}

const org = new orange('alice')
org.sayhello()

const bindedFn1 = orange.bind({})
const org1 = new bindedFn1('lyric')
org1.sayhello()

const bindedFn2 = orange.myBind({})
const org2 = new bindedFn2('lyric')
org2.sayhello()


// 判断是否通过 new 调用
// function Orange() {
//     if (this instanceof Orange) {
//         this.message = 'I am an orange created by new';
//     } else {
//         this.message = 'I am an orange with wrong context';
//     }
// }

