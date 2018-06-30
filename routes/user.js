/**
 * This file contains all the user routes
 */

const Router = require('restify-router').Router;
const { InternalServerError } = require('restify-errors');
const validate = require('restify-api-validation');
const Joi = require('joi');
const _ = require('lodash');

const routerInstance = new Router();
const userHandler = require('../handlers/Users');

// This is a route to add new users
routerInstance.post(
    '',
    validate(
        {
            body: {
                username: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().required()
            }
        }
    ), 
    async (req,res,next) => {
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
        
        // Omit the password field
        userInsert = _.omit(userInsert,['password']);
        req.log.info(userInsert);
        res.json(userInsert);
    }
    catch(e){
        req.log.error(e);
        next(new InternalServerError('Couldn\'t create user'));
    }
    


});

module.exports = routerInstance;