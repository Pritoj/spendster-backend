const { Model, knexSnakeCaseMappers } = require('objection');
const Knex = require('knex');

const dbConfig = require('../config/db');

// Initialize knex.
const knex = Knex({
    client: dbConfig.client,
    useNullAsDefault: true,
    connection: dbConfig.connection,
    ...knexSnakeCaseMappers()
});

// Give the knex object to objection.
Model.knex(knex);

module.exports = {
    knex,
    Model
}