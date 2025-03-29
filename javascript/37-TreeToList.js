function treeToList(data) {
    if (!Array.isArray(data) && data.length === 0) return;
    // 方式1
    return data.reduce((prev, cur) => {
        const {children} = cur;
        return Array.isArray(children) && children.length > 0 ? prev.concat(treeToList(children), cur) : prev.concat(cur);
    }, [])
    //方式2
    return data.reduce((prev, cur) => {
        const {children} = cur;
        return [
            ...prev,
            {...cur},
            ...(Array.isArray(children) && children.length > 0 ? treeToList(children) : [])
        ]
    }, [])
}
    
    