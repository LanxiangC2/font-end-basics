
// AJAX 封装

// （一）xhr 发起一个 get 请求
// const XHR = new XMLHttpRequest()
// const url = 'http://localhost:3000'
// XHR.open('GET', url, true)

// XHR.onreadystatechange = function () {
// 	// 
// 	if (XHR.readyState === 4) {
// 		if (XHR.status >= 200 && XHR.status < 300) {
// 			console.log('请求成功', XHR.responseText)
// 		} else {
// 			console.log('请求失败, 状态吗', XHR.status)
// 		}
// 	}
// }

// XHR.send();

// （二）xhr 发起一个 post 请求

// 多一步设置请求头的步骤
// XHR.open("POST", url, true)
// XHR.setRequestHeader('Content-type', 'application/json')
// const jsonData = JSON.stringify(data)
// XHR.send(jsonData)


// （三） 用 Promise 封装
class MyRequest {
	// 待优化点
	// XMLHttpRequest 复用问题：
	// 当前类中只创建了一个 XMLHttpRequest 实例，当同时发起多个请求时，
	// 会存在复用问题，可能导致请求结果混乱。
	// 可以为每个请求创建一个新的 XMLHttpRequest 实例。
	// 如下：
	//     #createXHR() {
    //     		return new XMLHttpRequest();
    //     }
	#xhr = null
	constructor () {
		this.#xhr = new XMLHttpRequest()
	}

	#handleSuccess (resolve, reject) {


		if (this.#xhr.readyState === 4) {
			if (this.#xhr.status >= 200 && this.#xhr.status < 300) {
				resolve(this.#xhr.responseText) 
			} else {
				reject(new Error(`请求失败，状态码: ${this.#xhr.status}`))
			}
		}
	}

	#handleReject (err, reject) {
		reject(err)
	}

	#handleParams(url, params) {
		if (!params) return url;
		const temp = `${url}`;
		const paramsStr = Object.entries(params).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')
		return url.includes('?') ? `${temp}&${paramsStr}` : `${temp}?${paramsStr}`
	}

	    // 封装公共的事件监听和错误处理逻辑
    #setupRequest(resolve, reject) {
        this.#xhr.onreadystatechange = () => {
            this.#handleSuccess(resolve, reject);
        };
        this.#xhr.onerror = (e) => {
            this.#handleReject(e, reject);
        };
    }


	get(url, options) {
		return new Promise((resolve, reject) => {
			const { params } = options || {};
			this.#xhr.open('GET', this.#handleParams(url, params), true)
			this.#setupRequest(resolve, reject);
			this.#xhr.send()
		})
	

	}

	post(url, options) {
		return new Promise((resolve, reject) => {
			const { data } = options || {};
			this.#xhr.open('POST', url, true);
			this.#xhr.setRequestHeader('Content-type', 'application/json');
			this.#setupRequest(resolve, reject);
			const jsonData = JSON.stringify(data)
			this.#xhr.send(jsonData)
		})

	}
}

const request = new MyRequest()

const url = 'https://localhost:3000';

try {
	const res = await request.get(url, {
		params: {
			name: 'lyric'
		}
	})

	console.log('res', res)
} catch (e) {
	console.error(e)
}