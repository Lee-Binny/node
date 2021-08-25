const query = {
    getGuildMembers: (guildId) => {
        return `
        SELECT
        *
        FROM
        guild_member
        WHERE
        guild_id = ${guildId}`;
    },
    getMyGuild: (userId) => {
        return `
        SELECT
        *
        FROM
        guild_member
        WHERE
        user_id = ${userId}`;
    }
}

module.exports = query;