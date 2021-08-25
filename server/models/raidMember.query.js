const query = {
    insertRaidMember: (raid, memberId, memberName) => {
        return `
        INSERT INTO
        raid_member
        (raid_id, member_id, member_name)
        VALUES
        (${raid}, ${memberId}, '${memberName}')`;
    }
}

module.exports = query;