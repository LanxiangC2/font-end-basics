
Function.prototype.myapply = function (thisArg, args) {

    if (typeof this !== 'function') {
        throw new TypeError('What is tring to be called is not callable!')
    }

    const ctx = thisArg || window;

    // 给上下文挂上这个函数，然后再执行这个函数
    const ukey = Symbol('ukey')
    ctx[ukey] = this
    // 还可以检查 args 是否为数组/类数组，不是的话抛出错误
    const res = ctx[ukey](...args)
    delete ctx[ukey]
    return res
}



const a = { 
    name: 'lyric',
    city: 'shenzhen',
    say: function (age, notAge) {
        console.log(`my name is ${this.name}, in ${this.city}, ${age} years old, not ${notAge} years old`)
    }
}

const b = {
    name: 'tsouling',
    city: 'chongqing'
}


a.say.apply(b, [20, 22])
a.say.myapply(b, [20, 22])