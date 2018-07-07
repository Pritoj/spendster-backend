const Entries = require('../db/models/Entries');

/**
 * Adds an entry to the entries table for the specified user
 * 
 * @param {integer} userId 
 * @param {string} name 
 * @param {number} amount 
 * @param {"INCOME" | "EXPENSE"} type 
 */

const addEntry = async (userId, name, amount, type) => {
    return Entries
        .query()
        .insert({
            userId,
            name,
            amount,
            type
        });
};

module.exports = {
    addEntry
};