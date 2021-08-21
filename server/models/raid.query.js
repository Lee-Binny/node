const query = {
    getRaids: (guildId) => {
        return `
        SELECT
        *
        FROM
        raid
        WHERE
        guild_id = ${guildId}`;
    }
}

module.exports = query;