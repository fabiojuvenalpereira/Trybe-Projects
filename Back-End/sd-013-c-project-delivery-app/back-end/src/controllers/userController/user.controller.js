const serviceUser = require('../../services/userService/user.service');

// createUser
const createUser = async (req, res) => {
    const { name, email, role, password } = req.body;
    const response = await serviceUser.createUser(name, email, role, password);
    res.status(201).json(response);
};

// userLogin
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const { status, data: token, Role } = await serviceUser.userLogin(email, password);

    return res.status(status).json({ token, Role });
};

// getAllusers
const getAllUser = async (_req, res) => {
    const { status, response } = await serviceUser.getAllUser();
    res.status(status).json(response);
};

module.exports = {
    userLogin,
    createUser,
    getAllUser,
};
