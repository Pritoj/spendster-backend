const { Model } = require('../index');

class Users extends Model {
    static get tableName() {
        return 'users';
    }
}