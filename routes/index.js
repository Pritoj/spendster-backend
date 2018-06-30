/**
 * This function imports all the routes and adds them
 * to the server provided.
 * @param {Restify Server Instance} server 
 */

const userRoutes = require('./user');

const addRoutes = (server) => {
    // Add the user routes
    userRoutes.applyRoutes(server);
}

module.exports = addRoutes;