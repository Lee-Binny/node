const query = {
    getGuildMembers: (guildId) => {
        return `
        SELECT
        *
        FROM
        guild_member
        WHERE
        guild_id = ${guildId}`;
    }
}

module.exports = query;