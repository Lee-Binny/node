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
    insertRaid: (guildId, title, name, color, boss, date) => {
        return `
        INSERT INTO
        raid
        (guild_id, title, name, color, boss_id, date)
        VALUES
        (${guildId}, '${title}', '${name}', '${color}', ${boss}, '${date}')`;
    },
    updateRaid: (id, title, color, boss) => {
        return `
        UPDATE
        raid
        SET
        title = '${title}', color = '${color}', boss_id = ${boss}
        WHERE
        id = ${id}`;
    }
}

module.exports = query;