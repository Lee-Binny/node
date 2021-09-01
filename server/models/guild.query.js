const query = {
    getGuild: (guildName) => {
        return `
        SELECT
        *
        FROM
        guild
        WHERE
        name = '${guildName}'`;
    },
    getGuildName: (guildId) => {
        return `
        SELECT
        name
        FROM
        guild
        WHERE
        id = ${guildId}`;
    },
    insertGuild: (name, uid) => {
        return `
        INSERT INTO
        guild
        (name, master_id, role)
        VALUES
        ('${name}', ${uid}, 0)`;
    },
}

module.exports = query;