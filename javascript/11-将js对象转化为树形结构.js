
const items = [
    { id: 1, name: 'item1', parentId: null },
    { id: 2, name: 'item2', parentId: null },
    { id: 3, name: 'item3', parentId: 1 },
    { id: 4, name: 'item4', parentId: 1 },
    { id: 5, name: 'item5', parentId: 4 },
    { id: 6, name: 'item6', parentId: 2 }
]

// const arrToTree = (arr, pNode = null) => {
//     const tree = []
//     for (let i = 0; i < arr.length; i++) {
//         const curNode = arr[i]; 
//         if (pNode == curNode.parentId) {
//             tree.push(curNode)
//             curNode.children = arrToTree(arr, curNode.id)
//         }
//     }
//     return tree
// }
// console.log(JSON.stringify(arrToTree(items), null, 2))

// 优化方案， 哈希表存储每个节点，避免多次遍历数组，将时间复杂度优化到 O(n)
const optimizedArrToTree = (items) => {
    const tree = [];
    const map = new Map();
    for (let i = 0; i < items.length; i++) {
        map.set(items[i].id, { ...items[i], children: [] })
    }
    items.forEach((item) => {
        if (item.parentId === null) {
            tree.push(map.get(item.id))
        } else {
            const pNode = map.get(item.parentId)
            if (pNode) {
                pNode.children.push(map.get(item.id))
            }
        }
    })
    return tree
}

console.log(JSON.stringify(optimizedArrToTree(items), null, 2))


// test area
const arrToTree = (items) => {
    const n = items.length;
    const map = new Map();
    const res = []

    // 1. 将所有节点放在 map 中
    for (let i = 0; i < n; i++) {
        map.set(items[i].id, { ...items[i], children: [] })
    }

    // 2. 处理节点
    for (let i = 0; i < n; i++) {
        const pid = items[i].parentId
        const id = items[i].id
        if (pid) {
            const pNode = map.get(pid)
            pNode.children.push(map.get(id))
            continue;
        }

        res.push(map.get(id))

    }

    return res;
}

console.log(JSON.stringify(arrToTree(items), null, 2))