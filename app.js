const restify = require('restify');

const addRoutes = require('./routes');
const passport = require('./auth');

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

    server.use(passport.initialize());

    server.on('restifyError', function (req, res, err, next) {
        console.log(err);
        // handle all errors passed to next here, whether it's Error or NotFoundError or anything that is an instance of Error
        res.status(err.status || 500);
        res.json(err.errors); 
    });

    // Add all the routes
    addRoutes(server);
};