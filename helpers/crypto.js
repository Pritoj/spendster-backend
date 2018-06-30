const bcrypt = require('bcrypt');

/**
 * This function uses bcrypt to hash string.
 * Mostly used for passwords.
 * 
 * @param {String} str 
 */
const hashString = async (str) => {
    return bcrypt.hash(str,10);
}

module.exports = {
    hashString
};