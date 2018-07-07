const addEntry = (
    server,
    token,
    name,
    amount,
    type,
) => {
    return server
        .post('/entries')
        .set('Authorization', `Bearer JWT ${token}`)
        .send({
            name,
            amount,
            type
        });
}

module.exports = {
    addEntry
};