const restify = require('restify');

const addRoutes = require('./routes');

/**
 * This adds parsers and routes to the server.
 * Basically bootstraps te app
 * @param {Restify Server Instance} server 
 */
module.exports = (server) => {
    // Add all the frigging parsers
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.bodyParser());

    // Add all the routes
    addRoutes(server);
};