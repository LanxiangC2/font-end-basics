
// 节流函数，隔一段时间执行, 场景： 频繁点解按钮，滚动加载
const throttle = (fn, timeout) => {
	
	let timer = null
	return function (...args){
		if (timer) return
		timer = setTimeout(() => {
            // fn(...args)
            // this 的绑定很关键，不然 this 指向的不是 person
            fn.apply(this, args)
			clearTimeout(timer)
            timer = null
		}, timeout)

	}
}


// 防抖函数，一定时间之后，延迟执行， 场景： 输入框搜索，窗口调整
const debounce = (fn, timeout) => {
	let timer = null;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn.apply(this, args)
			clearTimeout(timer);
			timer = null;

		}, timeout)
	}
}

// this 指向的问题需要重视
const person = {
    name: 'John',
    sayHello: function (age) {
        console.log(`Hello, my name is ${this.name}, my age is ${age}`);
    },
    consoleHelloThrottle: null,
    consoleHelloDebounce: null
};



// 测试 throttle
person.consoleHelloThrottle = throttle(person.sayHello, 1000)

person.consoleHelloThrottle(20)
person.consoleHelloThrottle(21)
person.consoleHelloThrottle(22)

setTimeout(() => {
	person.consoleHelloThrottle(23)
}, 3000)
console.log('throttle 测试用例1 ...')


// 测试 debounce
// person.consoleHelloDebounce = debounce(person.sayHello, 4000)

// person.consoleHelloDebounce(20)
// person.consoleHelloDebounce(21)
// person.consoleHelloDebounce(22)

// setTimeout(() => {
// 	person.consoleHelloDebounce(23)
// }, 3000)
// console.log('debounce 测试用例1 ...')
