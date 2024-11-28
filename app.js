const express = require('express');
const app = express();
const port = 3000;
const users = [];
let current_user = -1
let author = ''
const cycles = []
const image_begin = " ";

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

app.post('/api/login',(req,res)=>{
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            current_user = i;
            author = users[current_user].username;
            res.render('homepage');
        }
    }
    res.status(401).send('"Invalid email or password');
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // 检查用户是否已经存在
    if (users.some(user => user.username === username)) {
        res.status(400).send('Username already exists');
    } else {
        const comments = []
        const user = {
            "comments":comments,
            "username": username,
            "password": password,
            "image": image_begin,
        }
        users.push(user);
    }
});