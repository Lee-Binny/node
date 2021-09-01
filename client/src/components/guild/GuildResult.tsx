import React, { useState } from 'react';
import { Table, Card, CardGroup, Button } from 'react-bootstrap';
import { IGuild, IGuildMembers, IMaster } from './GuildPage';
import moment from 'moment';
import './Guild.css';
import GuildModal from './GuildModal';

interface IGuildResultProps {
    guild: IGuild;
    members: IGuildMembers[];
    master: IMaster;
}

const setMemberRole = (role: number) => {
    switch (role) {
        case 0: return '마스터';
        case 1: return '길드원';
    }
}

const GuildResult: React.FC<IGuildResultProps> = ({guild, members, master}) => {
    const [show, setShow] = useState<boolean>(false);
    const onClick = () => {
        setShow(true);
    }

    return (
        <CardGroup>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {guild.name}
                        <p className="create-date">created date: {moment(guild.createdDate).format("YYYY-MM-DD HH:mm:ss")}</p>    
                    </Card.Title>
                    <Card.Text>
                        <p>Level: {guild.level}</p>
                        <p>Master: {master.name}</p>
                    </Card.Text>
                    { sessionStorage.getItem('guildId') && sessionStorage.getItem('guildId') === '0' && (
                        <Button onClick={onClick} size="sm">길드 가입</Button>
                    ) } 
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>member list</Card.Title>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                members.map((value: IGuildMembers, index: number) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{value.userId}</td>
                                            <td>{value.userName}</td>
                                            <td>{setMemberRole(value.role)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <GuildModal show={show} setShow={setShow} guildId={guild.id} guildName={guild.name} />
        </CardGroup>
    )
}

export default GuildResult;