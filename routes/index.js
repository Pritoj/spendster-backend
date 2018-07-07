/**
 * This function imports all the routes and adds them
 * to the server provided.
 * @param {Restify Server Instance} server 
 */

const userRoutes = require('./user');
const entryRoutes = require('./entries');

const addRoutes = (server) => {
    // Add the user routes
    userRoutes.applyRoutes(server, '/users');
    // Add the entry routes
    entryRoutes.applyRoutes(server, '/entries');
}

module.exports = addRoutes;