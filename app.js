const express = require('express');

const cors = require('cors');
const app = express();
const port = 3000;
const users = [];
const posts = [];
let hot = -1;
let current_user = -1
const image_begin = " ";


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // 允许来自特定域名的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的HTTP方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true // 允许发送Cookie等凭证信息
}));

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


app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    // 检查用户是否已经存在
    if (users.some(user => user.username === username)) {
        res.status(400).send({
            "error": "Username already exists"
            });
    } else {
        const user = {
            "username": username,
            "password": password,
            "image": image_begin,
        }
        users.push(user);
        res.status(201).send({
            "message": "User registered successfully"
            })
    }
});


app.use(cors(corsOptions));


app.use('/api', authRoutes);
app.use('/api', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('This is our backend server');
});

app.use(express.static('public'));
//静态文件目录，访问http://localhost:3000/your-file-name 即可访问public目录下的文件