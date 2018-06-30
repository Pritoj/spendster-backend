const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'example.db'
    }
});

// Give the knex object to objection.
Model.knex(knex);

return {
    knex,
    Model
}