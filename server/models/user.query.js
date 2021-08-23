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
    },
    loginUser: (id, password) => {
        return `
        SELECT
        *
        FROM
        user
        WHERE
        user_id = "${id}" AND password = "${password}"`;
    }
}

module.exports = query;