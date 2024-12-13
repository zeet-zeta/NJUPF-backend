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

app.post('/api/login',(req,res)=>{
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            current_user = i;
            author = users[current_user].username;
            res.status(200).send({
                "userId": current_user
                });
        }
    }
    res.status(401).send({
        "error": "Invalid email or password"
        });
});

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

app.post('/api/user/profile/picture', (req, res) => {
    const { image } = req.body;
    // 检查用户是否已经存在
    if((typeof image)==="string"){
        users[current_user].image = image;
        res.status(200).send({
            "message": "Profile picture updated successfully"
            });
    }else{
        res.status(400).send({
            "error": "Invalid image format"
            })
    }
});

app.get('/api/posts/latest', (req, res) => {
    res.status(200).send(posts);
});

app.get('/api/posts/popular', (req, res) => {
    res.status(200).send(posts[hot]);
});

app.get('/api/posts/search', (req, res) => {
    const{query}=req.body;
    var result = [];
    for(let i = 0;i<posts.length;i++){
        if(posts[i].title.indexOf(query)>=0){
            result.push({
                "postId":i,
                "title":posts[i].title
            })
        }
    }
    res.status(200).send(result);
});

app.post('/api/posts', (req, res) => {
    const data = req.body;
    if(!data){
        res.status(400).send({
            "error": "Title is required"
            })
    }
    const new_post = {
        "postId": posts.length,
        "title": data.title,
        "author": data.author,
        "content": data.content,
        "createdAt": data.createdAt,
        "images": data.images,
        "averageRating": 0,
        "comments": []
    }
    posts.push(new_post);
    res.status(201).send({
        "message": "Post created successfully",
        "postId": new_post.postId
        })
});

app.get('/api/posts/{postId}', (req, res) => {
    const Id = req.params.postId;
    res.send(posts[Id]);
});