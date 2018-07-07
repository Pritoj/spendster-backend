const passport = require('passport-restify');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const { 
    NotFoundError,
    UnauthorizedError
} = require('restify-errors');

const Users = require('./db/models/Users');
const cryptoHelper = require('./helpers/crypto');

// Defining strategy to authenticate with email
// and password.
passport.use(new LocalStrategy({
    usernameField: 'email'
},(async (email, password, done) => {

    
    // Find user
    let user = await Users.query().findOne({email});
    if(!user) {
        // no user was found, throw 404
        return done(new NotFoundError());
    }
    
    // Check if the password matches
    let passwordCheck = await cryptoHelper
        .compareHash(password, user.password);

    if(!passwordCheck) {
        return done(new UnauthorizedError());
    }

    // Everything is amaze, move ahead
    return done(null, user);
})));

passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            // Here we decode the token
            let tokenData = await cryptoHelper.readWebToken(token);
            return done(null, tokenData);
        }
        catch (e) {
            return done(new UnauthorizedError());
        }
        
    }
));

module.exports = passport;