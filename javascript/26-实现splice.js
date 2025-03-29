const arr = [1, 3, 4, ,5, 7, 8, 9]

Array.prototype.splice = function(start, deleteCount, ...toAddArgs) {

    if (this === null || this === undefined) {
        throw new TypeError("Can not read property 'splice' of null or undefined!")
    }

    // 加分项，我们还可以判断 array 是否为密封/冻结对象
    // seal 对象，可以修改元素，但是不能增加属性
    if (Object.isSealed(this) && (deleteCount !== toAddArgs.length)) {
        throw new TypeError('The object is sealed object!')
    }
    // frozen 对象，啥也不能做
    if (Object.isFrozen(this) && (deleteCount > 0 || toAddArgs.length >= 0)) {
        throw new TypeError('The object is frozen object!')
    }

    
    const o = Object(this);
    const len = o.length >>> 0;
    
    // 加分项 前置数据清洗
    // startIdx 为负数，表示倒数的多少位开始，因此要处理 处理边界问题
    let startIdx = start < 0 ? Math.max(start + len, 0) : Math.min(start, len);
    // deleteCount 也可能为负数
    if (!deleteCount) {
        deleteCount = len - startIdx
    } else {
        // 1. < 0 就返回0 2. > 0 就看是不是比剩余节点数量还多，是返回剩余节点长度，不是就返回 deletecount
        deleteCount = Math.max(0, Math.min(len - startIdx, deleteCount))
    }
    const deleteArr = new Array(deleteCount);

    const copyDeleteEles = (start, deleteCount, deleteArr, o) => {
        for (let i = 0; i < deleteCount; i++) {
            if (i in o) {
                deleteArr[i] = o[start+i]
            }
        }
    }

    const movePostEles = (start, deleteCount, toAddArgs, o) => {
        if (deleteCount === toAddArgs.length) {
            return 
        }

        if (deleteCount > toAddArgs.length) {
            // 移动的位数等于差值
            let step = deleteCount - toAddArgs.length;
            let i = start + deleteCount;
            for (; i < o.length; i++) {
                o[i - step] = o[i]
                // i 项 为空位，那么移动后也应该是空位
                if (!(i in o)) {
                    delete o[i - step]
                }
            }
            // 最后要把末尾的数据删除
            for (let j = len - 1; j >= len - step; j--) {
                delete o[j]
            }
        }

        if (deleteCount < toAddArgs.length) {
            const step = toAddArgs.length - deleteCount;
            let i = o.length - 1;
            for(; i >= start + deleteCount; i--) {
                o[i + step] = o[i]
            }
        }
    }

    // 拷贝删除的数组，用于数组的返回
    copyDeleteEles(startIdx, deleteCount, deleteArr, o);

    // 移动节点
    // 这里有三种情况：
    // 1. 插入的长度 === 删除的长度，相当于替换
    // 2. 插入的长度 < 删除的长度，剩余节点往前移动
    // 3. 插入的长度 > 删除的长度，剩余节点往后移动
    movePostEles(startIdx, deleteCount, toAddArgs, o);

    for(let i = 0; i < toAddArgs.length; i++) {
        o[startIdx++] = toAddArgs[i];
    }

    o.length = len + toAddArgs.length - deleteCount;

    return deleteArr


}


console.log(arr.splice(3, 3, 1, 'lee', 'hello', 'world'))
console.log(arr)