function jsonp({ url, params, callbackName, timeout = 5000 }) {
    // 生成回调函数名，如果未提供则使用当前时间戳生成唯一名称
    const cbName = callbackName || `jsonp_${Date.now()}`;

    // 拼接请求参数，对参数名和参数值进行编码
    let arr = [];
    for (let p in params) {
        arr.push(`${encodeURIComponent(p)}=${encodeURIComponent(params[p])}`);
    }

    return new Promise((resolve, reject) => {
        // 创建 script 元素
        const scriptEle = document.createElement('script');
        // 拼接完整的请求 URL，对回调函数名进行编码
        scriptEle.src = `${url}?${arr.join('&')}&callback=${encodeURIComponent(cbName)}`;

        // 监听 script 元素的加载错误事件
        scriptEle.onerror = function () {
            // 加载失败时，拒绝 Promise 并抛出错误
            reject(new Error('JSONP load failed!'));
            // 移除 script 元素
            document.body.removeChild(scriptEle);
            // 清除定时器
            clearTimeout(timer);
        };

        // 将 script 元素添加到页面中
        document.body.appendChild(scriptEle);

        // 设置超时定时器
        const timer = setTimeout(() => {
            // 超时后，拒绝 Promise 并抛出错误
            reject(new Error('JSONP loaded timeout!'));
            // 移除 script 元素
            document.body.removeChild(scriptEle);
            // 删除全局回调函数
            delete window[cbName];
            // 清除定时器
            clearTimeout(timer);
        }, timeout);

        // 将回调函数绑定到 window 对象上
        window[cbName] = function (data) {
            // 请求成功时，解决 Promise 并传递数据
            resolve(data);
            // 移除 script 元素
            document.body.removeChild(scriptEle);
            // 删除全局回调函数
            delete window[cbName];
            // 清除定时器
            clearTimeout(timer);
        };
    });
}

// 服务端 需要设置响应的操作， express 为例
// let express = require('express')
// let app = express()
// app.get('/', function(req, res) {
//     let { a, b, callback } = req.query
//     console.log(a); // 1
//     console.log(b); // 2
//     // 注意哦，返回给script标签，浏览器直接把这部分字符串执行
//     res.end(`${callback}('数据包')`);
// })
// app.listen(3000)