// let timer = setInterval(() => {
//     console.log('我是 interval, 我每隔一段时间输出一次')
// }, 1000)


// setTimeout(() => {
//     clearInterval(timer)
//     timer = null
// }, 5000)
// 使用 setTimeout 实现 setInterval

const mySetInterval = (fn, time) => {

    let timer;
    let clear = false;

    const repeat = () => {
        // 每次调用之前清除一下
        clearTimeout(timer); // 是用于取消定时器，阻止定时器的回调函数执行
        timer = null; // 帮助垃圾回收机制释放不再使用的内存
        // 停止
        if (clear) return

        timer = setTimeout(() => {
            fn()
            repeat()
        }, time)
    }

    // 初始化调用一次
    repeat()


    return () => {
        clear = true
    }
}

let clearMyInterval = mySetInterval(() => console.log('使用 setTimeout 实现 setInterval'), 2000)

// 模拟清楚定时器函数的效果
setTimeout(() => {
    clearMyInterval()
}, 5000)