const { Model } = require('../index');

class Entries extends Model {
    static get tableName() {
        return 'entries';
    }

    static get relationMappings() {
        return {
            // Create a mapping with the user model
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: `${__dirname}/Users.js`,
                // Where the two are joined
                join: {
                    from: 'entries.userId',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Entries;