const authService = require('../services/auth_service');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images/') // 指定文件保存的目录
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // 生成唯一的文件名
//     }
// });

// const upload = multer({ storage: storage });

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userId = await authService.registerUser(username, password);
        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        res.status(400).json({ error: "Username already exists" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const { token, userId } = await authService.loginUser(username, password);
        res.status(200).json({ userId });
    } catch (error) {
        res.status(401).json({ error: "Invalid username or password" });
    }
};

const upload_picture = async (req, res) => {
    try {
        //TODO
        const {username,image} = req.body;
        // upload.single('file');
        
        res.download("../images/",)
        res.status(200).json({ avatar: upload.single('file')});
    } catch (error) {
        res.status(400).json({ error :"Invalid userID" });
    }
};

const fetch_picture = async (req, res) => {
    try {
        //TODO
        const userId = req.query;
        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error :"Invalid userID" });
    }
};

module.exports = { register, login,upload_picture,fetch_picture};