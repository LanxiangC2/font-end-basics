const arr = [4, 4, 2, 1, 0, 3, 88, 4, 6, 9]



/* 自己实现 sort 方法，可以做一个简化版本
*/

/**
 * 1. 基本版本
 */

// Array.prototype.sort = function (cb) {
//     if (this === null || this === undefined) {
//         throw new TypeError("Can not read property 'sort' of null or undefined! " )
//     }

//     const left = [];
//     const right = [];

//     const o = Object(this);
//     const len = o.length >>> 0;
//     const mid = Math.floor(len / 2)

//     for (let i = 0; i < len; i++) {
//         if (cb(o[i], o[mid])) {
//             right.push(o[i])
//         } else {
//             left.push(o[i])
//         }
//     }

//     return [...Array.prototype.sort.call(left, cb), o[mid], ...Array.prototype.sort.call(right, cb)]
// }

/**
 * 原地快排，可以把空间复杂度优化到 O(logn)
 */
Array.prototype.sort = function (cb) {
    if (this === null || this === undefined) {
        throw new TypeError("Can not read property 'sort' of null or undefined! " )
    }

    const o = Object(this);
    const len = o.length >>> 0;

    // 自定义一个比较函数
    const compareFn = cb || function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }

    const _quick  = (start, end, arr) => {
        // 找基准 pivot
        const pivot = end;
        let left = start;
        let right = end - 1;

        while (left < right) {

            while (left < right && compareFn(arr[left], arr[pivot]) < 0) {
                left++;
            }
            while (left < right && compareFn(arr[pivot], arr[right]) <= 0) {
                right--;
            }

            if (left >= right) break;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        [arr[left], arr[pivot]] = [arr[pivot], arr[left]];
        return left;
    }

    const quickSort = (start, end, arr) => {
        if (start < end) {
            const mid = _quick(start, end, arr)
            quickSort(start, mid - 1, arr)
            quickSort(mid + 1, end, arr)
        }
    }

    quickSort(0, len - 1, o);
    return o;

}


arr.sort((a, b) => a - b)

console.log(arr)