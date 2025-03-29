/**
 * 首先要了解 promise 的基本功能
 */

const promiseTemplate = new Promise((resolve, reject) => {
    setTimeout(() => {
        // 模拟异步操作成功或失败
        resolve('promise mock sync data, success')
        reject('promise mock sync data, fail')
    }, 2000)
})

promiseTemplate
    .then(
        (res) => console.log('promise 完成1', res), 
        (err) => console.log('promise 失败1', err)
    )
    .then(
        null,
        // (res) => console.log('promise 完成2', res), 
        (err) => console.log('promise 失败2', err)
    )
    .then(
        (res) => {
            // console.log('promise 完成3', res);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // 模拟异步操作成功或失败
                    resolve('promise3 data')
                    // reject('promise mock sync data, fail')
                }, 2000)
            })
        }, 
        (err) => console.log('promise 失败3', err)
    )
    .then(
        (res) => console.log('promise 完成4', res), 
        (err) => console.log('promise 失败4', err)
    )

/**
 * 仿写这个 promise
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MyPromise {


	#state = PENDING; // 表示私有属性
	#result = undefined; // 表示私有属性
	#handlers = [];


	#changeState = (state, result) => {
		if (this.#state !== PENDING) return
		this.#state = state;
		this.#result = result;
        this.#run();
	}

	constructor (executor) {
		const resolve = (data) => this.#changeState(FULFILLED, data)
		const reject = (reason) => this.#changeState(REJECTED, reason)

		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}
		
	}
    // 判断是否为 promise 对象, 满足 promise A+ 规范
    #isPromiseLike  (value) {
        return value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function'
    }
    // 微任务队列执行函数
    #runMicrotask(fn) {
        // 1. queueMicrotask 这个有兼容性问题
        if (typeof queueMicrotask === 'function') {
            queueMicrotask(fn)
        }
        // 2. node 环境
        else if (
            typeof process === 'object' &&
            typeof process.nextTick === 'function' 
        ) { 
            process.nextTick(fn)
        }
        // 3. 浏览器环境
        else if (
            typeof MutationObserver === 'function'
        ) {
            const observer = new MutationObserver(fn)
            const textNode = document.createTextNode('1')
            observer.observe(textNode, {
                characterData: true
            })
            textNode.textContent = '2'
            observer.disconnect()
        }
        // 4. 兜底
        else {
            setTimeout(fn, 0)
        }
    }

    #runone (callback, resolve, reject) {
        this.#runMicrotask(() => {
            if (typeof callback !== 'function') { 
                const settled = this.#state === FULFILLED ? resolve : reject;
                return settled(this.#result) // 穿透
            }
    
            try {
                const res = callback(this.#result)
                // 判断是否满足 promise A+ 规范
                if (this.#isPromiseLike(res)) { 
                    res.then(resolve, reject)
                } else {
                    resolve(res)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

	#run() {
		if (this.#state == PENDING) return 

		while (this.#handlers.length) {
			const { onFulFilled, onRejected, resolve, reject } = this.#handlers.shift()

			if (this.#state === FULFILLED) { 
                this.#runone(onFulFilled, resolve, reject)
			} else if (this.#state === REJECTED) {
                this.#runone(onRejected, resolve, reject)
			}


		}
	}

    // 难点 链式调用
    // 1. 这两个函数什么时候调用
    // 2. then 返回的还是一个 promise 对象, 什么时候完成，什么时候又是失败呢
    //   - a.对应的回调不是函数， b. then 返回的还是一个 promise 对象 c 是函数，看函数的运行过程有没有报错 resolve / reject
	then(onFulFilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			this.#handlers.push({
				onRejected,
				onFulFilled,
				resolve,
				reject
			})
            if (this.#state !== PENDING) {
                this.#run()
            }
		})
	}
}


const myPro = new MyPromise((resolve, reject) => {
    // throw Error('lyric error2')
    // reject('error2') 
	// resolve('1234')

    setTimeout(() => {
        // 模拟异步操作成功或失败
        resolve('lyric-promise mock sync data, success')
        reject('lyric-promise mock sync data, fail')
    }, 2000)
})

myPro
.then(
    // 123,
    (res) => console.log('my-promise 完成1', res), 
    (err) => console.log('my-promise 失败1', err)
)
.then(
    null,
    // (res) => console.log('my-promise 完成2', res), 
    (err) => console.log('my-promise 失败2', err)
)
.then(
    (res) => {
        // console.log('promise 完成3', res);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模拟异步操作成功或失败
                resolve('my-promise3 data')
                // reject('promise mock sync data, fail')
            }, 2000)
        })
    }, 
    (err) => console.log('my-promise 失败3', err)
)
.then(
    (res) => console.log('my-promise 完成4', res), 
    (err) => console.log('my-promise 失败4', err)
)

 
