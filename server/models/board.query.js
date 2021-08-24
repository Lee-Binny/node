const query = {
    getBoards: () => {
        return `
        SELECT
        *
        FROM
        board
        ORDER BY
        created_date
        DESC
        LIMIT
        50
        `;
    },
    writeBoard: (title, desc, name) => {
        return `
        INSERT INTO
        board
        (name, title, descript)
        VALUES
        ('${name}', '${title}', '${desc}')`;
    }
}

module.exports = query;