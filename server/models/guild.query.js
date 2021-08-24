const query = {
    getGuild: (guildName) => {
        return `
        SELECT
        *
        FROM
        guild
        WHERE
        name = '${guildName}'`;
    }
}

module.exports = query;