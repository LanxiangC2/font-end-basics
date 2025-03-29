const request = async (url, options) => {

    const defaultOpts = {

        headers: {
            'content-type': 'application/json'
        }
        
    }

    const finalOpts = {
        ...defaultOpts,
        ...options,
    }

    // 'GET', 'DELETE'
    if (['GET', 'DELETE'].includes(options.method) && finalOpts.params) {
        // 处理查询参数
        const { params } = options
        const query = Object.entries(params).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
        url += (url.includes('?') ? '&' : '?') + query;
        
    }

    // 'POST', 'PUT', 'PATCH'
    if (['POST', 'PUT', 'PATCH'].includes(finalOpts.method)) {
        // 为了将 JavaScript 对象或数组转换为 JSON 字符串，以满足 HTTP 请求对请求体格式的要求
        finalOpts.body = JSON.stringify(finalOpts.body)
    }

    // 发起请求
    const res = await fetch(url, finalOpts)

    if (!res.ok) {
        throw new Error(`请求失败，错误码为：${res.status}`)
    }

    return await res.json()

}


const get = async(url, params = {}, options) => {
    return request(url, {
        method: 'GET',
        params,
        ...options
    })
}

// post

const post = async(url, data = {}, options) => {
    return request(url, {
        method: 'POST',
        body: {
            ...data,

        },
        ...options
        
    })
}


const testGetFech = async () => {
    try {
        const res = await get('xxx', {
            k1: 'v1',
            k2: 'v2',
        })
        console.log('得到了数据:', res)
    } catch (e) {
        console.error(e)
    }


}


testGetFech();