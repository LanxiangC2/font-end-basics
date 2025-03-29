
const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        
        img.addEventListener('load', () => {
            resolve(img)
        })
        img.addEventListener('error', () => {
            reject(new Error('图片加载失败'))
        })
        
        img.src = url
    })
}

loadImage('https://www.example.com/test1.jpg')
    .then((img) => {
        const imgDiv = document.getElementById('img')

        if(imgDiv) {
            imgDiv.appendChild(img)
        }
        
    })
    .catch((e) => {
        console.error(e)
    })