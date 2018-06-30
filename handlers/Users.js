const Users = require('../db/models/Users');
const cryptoHelper = require('../helpers/crypto');

const addUser = async (username, email, password) => {
    // Hash the password for storage
    let passwordHash = await cryptoHelper.hashString(password);

    // Add the user.
    let user = await Users.query().insert({
        username,
        email,
        password: passwordHash
    });

    // return the user object
    return user;
};

const generateToken = async(userData) => {
    return cryptoHelper.generateWebToken(userData);
};

module.exports = {
    addUser,
    generateToken
};