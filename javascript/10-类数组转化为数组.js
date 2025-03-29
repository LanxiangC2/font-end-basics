/**
 * 场景：
 * 1. 在处理 DOM 元素集合时，经常会遇到类数组的 HTMLCollection 和 NodeList，
 *    便于遍历和操作获取到的多个 DOM 元素。
 * 2. 在函数内部，如果要处理不定数量的参数时，可以使用 arguments 类数组。
 */

function sum  () {
    console.log(arguments);
    console.log(Array.from(arguments)) // 使用 Array.from 转换
    console.log([...arguments]) // 推荐使用展开运算符
    console.log(Array.prototype.slice.call(arguments)) // 使用 slice 方法
}

sum(1, 2, 3);