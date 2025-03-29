

const formatNumberWithComma = (a) => {
    const arr = a.split('.')
    // 提取整数部份
    const integers = arr[0].split('').reverse()
    const decimals = arr[1]

	const res = [] // 结果数组

	let i = 0
	while (i < integers.length) {
		res.push(integers[i])
		if ((i + 1) % 3 === 0 && i !== (integers.length - 1)) {
			res.push(',')
		}
		i++
	}
	return `${res.reverse().join('')}${decimals ? '.' + decimals : ''}`
}

const optimizedFormatNumberWithComma = (a) => {
    // 直接使用 toLocaleString 方法
    // return a.toLocaleString()

    // 使用正则表达式替换, 1. 小数 2. 负数 3. 非数字的情况
    if (isNaN(a) || typeof a !== 'string') return a;
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}



// 测试用例
console.log('测试用例1', formatNumberWithComma('50011719960703'))
console.log('测试用例2', formatNumberWithComma('60703.343'))
console.log('测试用例3', formatNumberWithComma('703'))

console.log('测试 toLocaleString() 方法', Number(34343431934.98).toLocaleString())

console.log('优化后的测试用例1', optimizedFormatNumberWithComma('50011719960703'))
console.log('优化后的测试用例2', optimizedFormatNumberWithComma('-60703.343'))
console.log('优化后的测试用例3', optimizedFormatNumberWithComma('-70334'))
console.log('优化后的测试用例3', optimizedFormatNumberWithComma('aaa'))
