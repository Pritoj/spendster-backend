exports.up = function(knex, Promise) {
    return knex.schema.createTable('entries', (t) => {
        t.increments();

        // Name of this entry, like "Got milk for cat"
        //P.S. don't get milk for cat. It's not good for cat
        t.string('name');

        t.decimal('amount', 2);

        t.enum('type', ["INCOME" , "EXPENSE"]);

        t.bigInteger('user_id')
            .references('id')
            .inTable('users');

        t.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('entries');
};
