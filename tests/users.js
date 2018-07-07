const Users = require('../db/models/Users');
const usershelper = require('./testHelpers/userHelper.js');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', () => {
    before(async () => {
        // Empty out users
        await Users.query().delete();
    });

    describe('Create a user', () => {
        it('should create a user', async () => {
            let createReq = await usershelper.addUser(chai.request(server));
            expect(createReq.status).to.equal(201);
        });

        it('should not create a user with same email', async () => {
            let createReq = await usershelper.addUser(
                chai.request(server),
                'pritojs1',
                'pritojs@gmail.com',
                '123451'
            );
            expect(createReq.status).to.equal(400);
        });

        it('should not create a user with bad email', async () => {
            let createReq = await usershelper.addUser(
                chai.request(server),
                'pritojs1',
                'pritojsgmail.com',
                '123451'
            );

            expect(createReq.status).to.equal(400);
        });
    });

    describe('User Login', () => {
        it('should let user login', async () => {
            // Now try login
            let loginReq = await usershelper.loginUser(
                chai.request(server),
                'pritojs@gmail.com',
                '12345'
            );

            expect(loginReq.status).to.equal(200);
        });

        it('should not let user login with wrong password', async () => {
            // Now try login
            let loginReq = await usershelper.loginUser(
                chai.request(server),
                'pritojs@gmail.com',
                '123451'
            );

            expect(loginReq.status).to.equal(401);
        });

        it('should not let user login with bad email', async () => {
            // Now try login
            let loginReq = await usershelper.loginUser(
                chai.request(server),
                'pritoj1s@gmail.com',
                '12345'
            );
           
            expect(loginReq.status).to.equal(404);
        });
    });
});
