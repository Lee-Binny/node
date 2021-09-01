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
    },
    insertGuildMember: (guildId, userId, userName) => {
        return `
        INSERT INTO
        guild_member
        (guild_id, user_id, user_name, role)
        VALUES
        (${guildId}, ${userId}, '${userName}', 1)`;
    }
}

module.exports = query;