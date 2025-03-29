// node.js 做一个简单的 api 

const express = require('express');

const app = express();

app.use(express.json())

app.use((req, res, next) => {
    // 允许跨域请求，指定域名并携带 cookie
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Credentials', true);

    // 允许跨域请求，所有域名
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Credentials', false);
    next();
})

app.get('/api/v1', (req, res) => {
    res.cookie('name', 'lyric-cookie');
    const data = {
        message: 'Hello, world! --' + (Math.random() * 100).toFixed(2)
    };
    setTimeout(() => {
        res.json(data);
    },5000)
    // res.json(data);
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})