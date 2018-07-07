const addEntry = async (
    server,
    token,
    name,
    amount,
    type,
) => {
    return await server
        .post('/entries')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name,
            amount,
            type
        });
}

module.exports = {
    addEntry
};