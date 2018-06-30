/**
 * This file contains all the user routes
 */

const Router = require('restify-router').Router;
const { InternalServerError } = require('restify-errors');

const routerInstance = new Router();
const userHandler = require('../handlers/Users');

// This is a route to add new users
routerInstance.post('/', async (req,res,next) => {
    // Extract from the request body the required params
    const {
        username,
        email,
        password
    } = req.body;
    
    req.log.info('Adding new user');

    try {
        // Insert the user record
        let userInsert = await userHandler.addUser(username, email, password);
        req.log.info(userInsert);
        res.json({success:true});
    }
    catch(e){
        req.log.error(e);
        next(new InternalServerError());
    }
    


});

module.exports = routerInstance;