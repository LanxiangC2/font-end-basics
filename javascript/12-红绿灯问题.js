

const colorEnum = {
    red: 'red',
    green: 'green',
    yellow: 'yellow'
}
const lightDuration = {
    [colorEnum.red]: 3000,
    [colorEnum.green]: 1000,
    [colorEnum.yellow]: 2000,
}

/*
可读性不好
Promise 未正确链式调用
错误处理缺失
*/
// const lights = (light = colorEnum.red) =>  new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(`${light} light --- duration: ${lightDuration[light]}ms`)
//         if (light === colorEnum.red) {
//             return lights(colorEnum.green, lightDuration.green)
//         }

//         if (light === colorEnum.green) {
//             return lights(colorEnum.yellow, lightDuration.yellow)
//         }

//         if (light === colorEnum.yellow) {
//             return lights(colorEnum.red, lightDuration.red)
//         }
//     },  lightDuration[light])
// })
// lights(colorEnum.red)


/**
 * 更好的解决办法
 */
const lights  = (color = colorEnum.red) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${color} light on, duration: ${lightDuration[color]}ms`)
            resolve();
        }, lightDuration[color])
    })
}

// 控制顺序的函数

const lightOn = async () => {
    while (true) {
        await lights(colorEnum.red)
        await lights(colorEnum.green)
        await lights(colorEnum.yellow)
    }
}

// .then 的写法
const lightOn2 = () => {
    lights(colorEnum.red)
        .then(() => lights(colorEnum.green))
        .then(() => lights(colorEnum.yellow))
        .then(() => lightOn2())
}

// 启动
// lightOn()
lightOn2()

