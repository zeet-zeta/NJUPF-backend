const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/hello', function (req, res, next) {
  res.json({ message: '欢迎来到Pornhub捏' });
});

module.exports = router;
