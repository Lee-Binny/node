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
}

module.exports = query;