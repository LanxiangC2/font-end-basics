// 数组去重
// 1. Set
const uniqueArrFromSet = (arr) => {
    return [...new Set(arr)]
}
// 2. filter
const uniqueArrFromFilter = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}
// 3. reduce 去重
const unqueueArrFromReduce = (arr) => {
    return arr.reduce((acc, cur) => {
        if (!acc.includes(cur)) {
            acc.push(cur)
        }
        return acc
    }, [])
}







/** 测试用例 */
console.log('脚本开始运行')
const arr = [1, 2, 3, 4, 5, 6, 6, 6, 7, 8, 9, 10];
console.log(uniqueArrFromSet(arr))
console.log(uniqueArrFromFilter(arr))
console.log(unqueueArrFromReduce(arr))