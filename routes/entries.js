/**
 * This file contains all the entry routes
 */

const Router = require('restify-router').Router;
const { InternalServerError, BadRequestError } = require('restify-errors');
const validate = require('restify-api-validation');
const Joi = require('joi');
const _ = require('lodash');

const routerInstance = new Router();
const entryHandler = require('../handlers/Entries');
const passport = require('../auth');

// This is a route to add new users
routerInstance.post(
    '',
    validate(
        {
            body: {
                name: Joi.string().required(),
                amount: Joi.number().required(),
                type: Joi.valid('INCOME','EXPENSE')
            }
        }
    ),
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        let {
            name,
            amount,
            type
        } = req.body;

        let userId = req.user.id;
        
        let entry = await entryHandler.addEntry(
            userId,
            name,
            amount,
            type
        );

        res.json(entry);
    }
);

module.exports = routerInstance;