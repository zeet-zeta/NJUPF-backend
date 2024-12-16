const express = require('express');
const { register, login, upload_picture, fetch_picture } = require('../controllers/auth_controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/avatar/upload',upload_picture)
router.get('/avatar/fetch',fetch_picture)

module.exports = router;