const Users = require('../db/models/Users');

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
            let createReq = await chai.request(server)
                .post('/users')
                .send({
                    username: 'pritojs',
                    email: 'pritojs@gmail.com',
                    password: '12345'
                });
            expect(createReq.status).to.equal(201);
        });

        it('should not create a user with same email', async () => {
            let createReq = await chai.request(server)
                .post('/users')
                .send({
                    username: 'pritojs1',
                    email: 'pritojs@gmail.com',
                    password: '123451'
                });

            expect(createReq.status).to.equal(400);
        });

        it('should not create a user with bad email', async () => {
            let createReq = await chai.request(server)
                .post('/users')
                .send({
                    username: 'pritojs1',
                    email: 'pritojsgmail.com',
                    password: '123451'
                });

            expect(createReq.status).to.equal(400);
        });
    });

    describe('User Login', () => {
        it('should let user login', async () => {
            // Now try login
            let loginReq = await chai.request(server)
                .post('/users/token')
                .send({
                    email: 'pritojs@gmail.com',
                    password: '12345'
                });

            expect(loginReq.status).to.equal(200);
        });

        it('should not let user login with wrong password', async () => {
            // Now try login
            let loginReq = await chai.request(server)
                .post('/users/token')
                .send({
                    email: 'pritojs@gmail.com',
                    password: '123451'
                });

            expect(loginReq.status).to.equal(401);
        });

        it('should not let user login with bad email', async () => {
            // Now try login
            let loginReq = await chai.request(server)
                .post('/users/token')
                .send({
                    email: 'pritoj1s@gmail.com',
                    password: '12345'
                });

            expect(loginReq.status).to.equal(404);
        });
    });
});
