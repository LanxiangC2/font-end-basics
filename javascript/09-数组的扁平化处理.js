
const flattenDeep = (arr) => {
    return arr.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            acc.push(...flattenDeep(cur))
        } else {
            acc.push(cur)
        }
        return acc
    }, [])
}




/** 测试 */

const exampleArr = [1, 2, [4, 6, 7], [8, 9, [10, 11]]]
const result = flattenDeep(exampleArr)

console.log(result)