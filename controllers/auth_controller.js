const authService = require('../services/auth_service');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userId = await authService.registerUser(username, password);
        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const { token, userId } = await authService.loginUser(username, password);
        res.status(200).json({ token, userId });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };