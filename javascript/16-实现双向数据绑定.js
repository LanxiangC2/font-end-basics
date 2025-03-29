// 视图层的数据改变 -> 通知数据层的数据更新（依赖）

const obj = {
    name: 'lyric',
    birth: '2000-01-02'
}

const getName = () => {
    console.log(`obj's name is ${obj.name}`)
    return `obj's name is ${obj.name}`
}

// watcher 类似于 vue 中的 watcher，用来监听数据的变化
observe(obj)
// dep 类似于 vue 中的 dep，用来收集依赖的函数
const depGetName = () => {
    dep(getName)
}

depGetName(); // 模拟的是 UI 层显示数据


function observe (raw) {
        const deps = {}
        Object.keys(raw).forEach((key) => {
            let value  = raw[key]
            Object.defineProperty(raw, key, {
                get() {
                    if (!deps[key]) {
                        deps[key] = []
                    }
                    if (global._fn_ && !deps[key].includes(global._fn_)) {
                        deps[key].push(global._fn_)
                    }
                    return value
                },
                set(v) {
                    value = v
                    for (let i = 0; i < deps[key].length; i++) {
                        const fn = deps[key][i]
                        if (fn) fn()
                    }
                }
            } )
        })

}

function dep (fn) {
    global._fn_ = fn
    fn()
    global._fn_ = null
}







// ** 测试 ***

obj.name = 'xiaohuang'
// 问题1. 我改了名字之后，如何通知 UI 层修改数据呢，这里用 getName 函数来表示
// getName()不就行了？问题是项目变大后，数据多了之后，写法冗余，维护性和可读性都很差啊
// 用defineProperty, 每次对 obj的读写都可以知道了

// 问题2 我怎么知道哪些函数对变量进行了绑定或者是读写？
//      这里涉及到依赖收集的问题了
//      在 getName() 运行之前，我告诉 observe 类，在运行的时候把这个函数当作依赖收集起来

