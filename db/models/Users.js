const { Model } = require('../index');

class Users extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        let Entries = require('./Entries');
        return {
            // Create a mapping with the user model
            entries: {
                relation: Model.HasManyRelation,
                modelClass: Entries,
                // Where the two are joined
                join: {
                    from: 'users.id',
                    to: 'entries.userId'
                }
            }
        };
    }
}

module.exports = Users;
//a = u.tableName;