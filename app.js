const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth_routes');
const postsRoutes = require('./routes/posts_routes');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api', authRoutes);
app.use('/api', postsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('This is our backend server');
});

app.use(express.static('public'));
//静态文件目录，访问http://localhost:3000/your-file-name 即可访问public目录下的文件