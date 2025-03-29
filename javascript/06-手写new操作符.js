
/**
 * new 操作符干了什么
 * 需要注意构造函数可能会有以下几种情况
 * 1. 普通构造函数
 * 2. 构造函数返回一个对象
 */

function Person (lover) {
    this.name = 'lyric';
    this.age = '29';
    this.lover = lover || 'someone';

    // return {
    //     brand: 'apple',
    //     year: 2025
    // }
}

function myNew(constructor, ...args) {
    if (typeof constructor !== 'function') {
        throw new TypeError('constructor is not a function!')
    }

    /**
     *  __proto__ 并不是标准属性，
     * 它的使用存在一些性能问题，并且在一些旧的环境中可能不被支持。
     * 更好的做法是使用 Object.create() 方法来创建新对象，
     * 该方法会自动将新对象的原型设置为指定的原型对象。
     */
    // const obj = {};
    // obj.__proto__ = constructor.prototype;

    const obj = Object.create(constructor.prototype)
    const res = constructor.apply(obj, args)

    /**
     * res instanceof Object 这个判断条件在大多数情况下能正确判断构造函数的返回值是否为对象，
     * 但存在一个特殊情况，即当构造函数返回 null 时，null 也会通过这个判断，
     * 因为在 JavaScript 中 null 是原始值，不是对象，这会导致返回 null 而不是新创建的对象，
     * 与 new 操作符的行为不符。正确的做法应该是判断 res 是否为对象且不为 null。
     */
    // return res instanceof Object ? res : obj;
    return typeof res === 'object' && res !== null ? res : obj;
}

const p1 = new Person();
const p2 = myNew(Person, 'someone2')

console.log(p1);
console.log(p2);