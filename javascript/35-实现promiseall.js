

const promiseAll = function(promises) {
    return new Promise((resolve, reject) => {
        const results = []
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((result) => {
                if (result) {
                    results[i] = result;
                    count++;
                };
                if (count === promises.length) {
                    resolve(results)
                }
            })
        }
        
    })
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve(1)
    }, 3000)

})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(2)
        resolve(2)
    }, 1000)
})


const res = Promise.all([p1, p2]).then((result) => {
    console.log('所有完成,', result)
})

const res2 = promiseAll([p1, p2]).then(res => console.log('自定义实现，', res))