const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.use(express.static('public'));
//静态文件目录，访问http://localhost:3000/your-file-name即可访问public目录下的文件