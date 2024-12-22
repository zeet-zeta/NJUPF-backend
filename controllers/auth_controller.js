const authService = require('../services/auth_service');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userID = await authService.registerUser(username, password);
        res.status(201).json({ userID });
    } catch (error) {
        res.status(400).json({ error: "Username already exists" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userID = await authService.loginUser(username, password);
        res.status(200).json({ userID });
    } catch (error) {
        res.status(401).json({ error: "Invalid username or password" });
    }
};

const uploadAvatar = async (req, res) => {
    const userID = req.body.userID;
    try {
        await authService.updateAvatar(userID, req.file.filename);
        res.status(201).json({ avatar: req.file.filename });
    } catch (error) {
        res.status(400).json({ error: "Invalid userID" });
    }
}

const getAvatar = async (req, res) => {
    const userID = req.query.userID;
    try {
        const avatar = await authService.getAvatar(userID);
        res.status(200).json({ avatar });
    } catch (error) {
        res.status(400).json({ error: "Invalid userID" });
    }
} 

module.exports = { register, login, uploadAvatar, getAvatar };