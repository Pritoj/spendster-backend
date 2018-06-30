/**
 * This file contains all the user routes
 */

const Router = require('restify-router').Router;
const routerInstance = new Router();

// This is just a test route
routerInstance.get('/hello', (req,res) => {
    res.json({'hello':'world'});
});

module.exports = routerInstance;