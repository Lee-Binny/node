const query = {
    getUser: (userId) => {
        return `
        SELECT
        *
        FROM
        user
        WHERE
        id = ${userId}`;
    },
    getUserByName: (name) => {
        return `
        SELECT
        *
        FROM
        user
        WHERE
        name = "${name}"`;
    }

}

module.exports = query;