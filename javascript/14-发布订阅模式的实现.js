class PubSub {


    #event = new Map()

    constructor() {

    }

    subscribe(eventName, callback) {
        if (this.#event.has(eventName)) {
            const cbs = this.#event.get(eventName)
            this.#event.set(eventName, [...cbs, callback])
        } else {
            this.#event.set(eventName, [callback])
        }
    }

    publish(eventName, data) {
        if (this.#event.has(eventName)) {
            const cbs = this.#event.get(eventName)
            cbs.forEach((cb) => cb(data))
            return
        }
        // 在抛出错误时，建议使用 new Error 来创建错误对象，而不是直接使用 Error。
        // 虽然在 JavaScript 中直接使用 Error 也能抛出错误，但 new Error 是更标准和推荐的做法，
        // 这样能保证错误对象包含更完整的信息，便于调试和错误处理。
        // throw Error('no event registered!')
        throw new Error('no event registered!')
    }

    unsubscribe(eventName) {
        if (this.#event.has(eventName)) {
            this.#event.delete(eventName)
            return
        }
        throw Error('nothing can unsubscribe!')
    }
    
}

// 使用示例

const pubsub = new PubSub()

pubsub.subscribe('wake-up', (data) => {
    console.log('wake-up cb1', data);
})

pubsub.subscribe('wake-up', (data) => {
    console.log('wake-up cb2', data);
})

pubsub.publish('wake-up', {
    publisher: 'lyric',
    time: 54543434,
})

pubsub.unsubscribe('wake-up')

pubsub.publish('wake-up', {
    publisher: 'lyric',
    time: 54543434,
})