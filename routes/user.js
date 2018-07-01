/**
 * This file contains all the user routes
 */

const Router = require('restify-router').Router;
const { InternalServerError, BadRequestError } = require('restify-errors');
const validate = require('restify-api-validation');
const Joi = require('joi');
const _ = require('lodash');

const routerInstance = new Router();
const userHandler = require('../handlers/Users');
const passport = require('../auth');

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
        res.status(201);
        res.json(userInsert);
    }
    catch(e){
        next(new BadRequestError('Couldn\'t create user'));
    }
});

// This is a route to get a login token via username and password
routerInstance.post(
    '/token',
    validate(
        {
            body: {
                email: Joi.string().required().email(),
                password: Joi.string().required()
            }
        }
    ),
    passport.authenticate('local',{session:false}),
    async (req,res,next) => {
        // Check the user data sent, remove the password
        let userData = _.omit(req.user,['password']);

        // Generate token
        let token = await userHandler.generateToken(userData);
        res.json({token,userData});
    }
);

module.exports = routerInstance;