const express = require('express');
const { register, login, uploadAvatar, getAvatar } = require('../controllers/auth_controller');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/register', register);
router.post('/login', login);
router.post('/avatar/upload', upload.single('image'), uploadAvatar);
router.get('/avatar/fetch', getAvatar);

module.exports = router;