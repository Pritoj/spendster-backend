/**
 * Hits the API to create new user
 * @param {server} server Chai server instance
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 */
const addUser = async (
    server,
    username = "pritoj",
    email = "pritojs@gmail.com",
    password = "12345") => {

    return await server
        .post('/users')
        .send({
            username,
            email,
            password
        });

}

/**
 * Hits the API to login
 * @param {server} server Chai server instance
 * @param {string} email 
 * @param {string} password 
 */
const loginUser = async (
    server,
    email,
    password
) => {
    return await server
        .post('/users/token')
        .send({
            email,
            password
        });
}

module.exports = {
    addUser,
    loginUser
}