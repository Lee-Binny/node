const query = {
    getRaid: (raidId) => {
        return `
        SELECT
        *
        FROM
        raid
        WHERE
        id = ${raidId}`;
    },
    getRaids: (guildId) => {
        return `
        SELECT
        *
        FROM
        raid
        WHERE
        guild_id = ${guildId}`;
    },
    insertRaid: (guildId, title, color, boss, date) => {
        return `
        INSERT INTO
        raid
        (guild_id, title, color, boss_id, date)
        VALUES
        (${guildId}, '${title}', '${color}', ${boss}, '${date}')`;
    }
}

module.exports = query;