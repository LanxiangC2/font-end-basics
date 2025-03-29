import { cloneDeep } from 'lodash-es'

const person = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York'
    },
    
    sayHello () {
        console.log('Hello')
    }, // 1. 函数属性

    date: new Date(), // 2. 日期对象
    pattern: /abc/g, // 3. 正则表达式
    map: new Map()
}
person.self = person; // 4. 循环引用
person.map.set('lyric', { name: 'lyric', age: 20}) // map


// JSON序列化 深拷贝，可以拷贝多层对象属性, 但是不能拷贝方法, 
// ** 1. JSON.stringify() 会忽略对象中的函数属性，因为函数不能被序列化为 JSON 字符串
// ** 2. 无法处理正则表达式
// ** 3. 无法处理 Date 对象
// ** 4. 无法处理循环引用, 会直接报错
const myCustomeDeepCloneWithJSONParse = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

const shadowcopy = (obj) => {
    // 1. Object assing 浅拷贝，只拷贝一层对象属性，更深层的不会拷贝
    return Object.assign({}, obj)
}

const myCloneDeep = (o) => {

    const cache = new WeakMap(); // 缓存对象，解决循环引用问题

    const _deepClone = (o) => {
        // 检查是否已经处理过该对象了
        if (cache.has(o)) {
            return cache.get(o)
        }

        if (o === null || typeof o !== 'object') {
            return o
        }
        // 处理时间对象
        if (o instanceof Date) { 
            return new Date(o)
        }
        // 处理正则对象
        if (o instanceof RegExp) {
            return new RegExp(o)
        }
        // 处理 Map 和 Set 对象
        if (o instanceof Map) {
            // 深度递归
            const newO = new Map()
            cache.set(o, newO);
            for (let [key, value] of o) {
                newO.set(key, _deepClone(value))
            }
            return newO;
        }
        if (o instanceof Set) {
            // 深度递归
            const newSet = new Set();
            cache.set(o, newSet);
            for (let val of o) {
                newSet.add(_deepClone(val))
            }
            return newSet;
        }

        // 处理数组和对象
        const isArray = Array.isArray(o);
        const newO = isArray ? [] : {};
        cache.set(o, newO);
        if (isArray) {
            for (let key of o) {
                newO.push(_deepClone(key))
            }
        } else {
            for (let key in o) {
                if (Object.prototype.hasOwnProperty.call(o, key)) {
                    newO[key] = _deepClone(o[key])
                }
            }
        }
        return newO;
    }

    return _deepClone(o)
}

const shadowcopyPerson = shadowcopy(person)
const deepcopyPerson = cloneDeep(person)
const mydeepcopyPerson = myCloneDeep(person)


// **************** 测试 *****************

person.address.city = 'Los Angeles'
person.map.set('lyric', { 'name': 'zouling', age: 20 })

console.log('原对象 ====',person)
// console.log('日期类型', typeof person.date)

console.log('浅拷贝 ====', shadowcopyPerson)
// console.log('日期类型', typeof shadowcopyPerson.date)

console.log('深拷贝 ====', deepcopyPerson)
// console.log('日期类型', typeof deepcopyPerson.date)
console.log('自定义深拷贝 ====', mydeepcopyPerson)
