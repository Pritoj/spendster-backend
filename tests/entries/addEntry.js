const Users = require('../../db/models/Users');
const Entries = require('../../db/models/Entries');
const usershelper = require('../testHelpers/userHelper');
const entrieshelper = require('../testHelpers/entriesHelper');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../bin/www');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Entries', () => {
    before(async () => {
        // Empty out the entries
        await Entries.query().delete();
        // Empty out users
        await Users.query().delete();
    });

    describe('Adding an entry', async () => {
        it('should add an entry', async () => {
            // First create a new user
            let createReq = await usershelper
                .addUser(chai.request(server));
            expect(createReq.status).to.equal(201);

            // Now login
            // Now try login
            let loginReq = await usershelper
                .loginUser(
                    chai.request(server),
                    'pritojs@gmail.com',
                    '12345'
                );

            // Make sure you were able to login
            expect(loginReq.status).to.equal(200);

            // Extract token from the response
            let { token } = loginReq.body;
            // Send the add entry response
            let addEntryReq = await entrieshelper
                .addEntry(
                    chai.request(server),
                    token,
                    "Cat's food",
                    1000,
                    "EXPENSE"
                )

            // Make sure the request went well
            expect(addEntryReq.status).to.equal(200);

            // Make sure the entry was added
            let entry = await Entries.query().findOne();

            expect(entry.name).to.equal("Cat's food");
            expect(entry.amount).to.equal(1000);
            expect(entry.type).to.equal("EXPENSE");
        });

    });
});