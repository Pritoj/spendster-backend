const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const appConfig = require('../config/app');

/**
 * This function uses bcrypt to hash string.
 * Mostly used for passwords.
 * 
 * @param {String} str 
 */
const hashString = async (str) => {
    return bcrypt.hash(str,appConfig.bcryptSaltRounds);
}

/**
 * This function checks if the given string and the 
 * hashed strings are the same.
 * 
 * @param {String} str The string to be checked
 * @param {String} hash The encrypted string
 */
const compareHash = async (str, hash) => {
    return bcrypt.compare(str,hash);
}

const generateWebToken = async (data) => {
    return jwt.sign(JSON.stringify(data),appConfig.secretJWTKey);
}

const readWebToken = async (token) => {
    return jwt.verify(token, appConfig.secretJWTKey);
}


module.exports = {
    hashString,
    compareHash,
    generateWebToken,
    readWebToken
};