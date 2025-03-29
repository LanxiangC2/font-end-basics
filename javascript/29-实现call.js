
Function.prototype.mycall = function (thisArg, ...args) {

    if (typeof this !== 'function') {
        throw new TypeError('What is tring to be called is not callable!')
    }

    const ctx = thisArg || window;

    // 给上下文挂上这个函数，然后再执行这个函数
    const ukey = Symbol('ukey')
    ctx[ukey] = this
    const res = ctx[ukey](...args)
    // 如果是 apply 
    // const res = ctx[ukey](args)
    delete ctx[ukey]
    return res
}



const a = { 
    name: 'lyric',
    city: 'shenzhen',
    say: function (age) {
        console.log(`my name is ${this.name}, in ${this.city}, ${age} years old`)
    }
}

const b = {
    name: 'tsouling',
    city: 'chongqing'
}


a.say.call(b, 20)
a.say.mycall(b, 20)