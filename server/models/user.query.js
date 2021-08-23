const query = {
    getUser: (id) => {
        return `
        SELECT
        *
        FROM
        user
        WHERE
        id = ${id}`;
    },
    getUserByUserId: (userId) => {
        return `
        SELECT
        *
        FROM
        user
        WHERE
        user_id = "${userId}"`;
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
    getUserByUserIdOrName: (userId, name) => {
        return `
        SELECT
        *
        FROM
        user
        WHERE
        user_id = "${userId}" OR name = "${name}"`;
    },
    loginUser: (id, password) => {
        return `
        SELECT
        *
        FROM
        user
        WHERE
        user_id = "${id}" AND password = "${password}"`;
    },
    signup: (userId, password, name) => {
        return `
        INSERT INTO
        user
        (user_id, password, name)
        VALUE
        ("${userId}", "${password}", "${name}")`;
    },
    deleteUser: (id) => {
        return `
        DELETE FROM
        user
        WHERE
        id = ${id}`;
    }
}

module.exports = query;