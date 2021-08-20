import React from 'react';
import { Table, Card, CardGroup, Button } from 'react-bootstrap';
import { IGuild, IGuildMembers, IMaster } from './GuildPage';
import moment from 'moment';
import './Guild.css';

interface IGuildResultProps {
    guild: IGuild;
    members: IGuildMembers[];
    master: IMaster;
}

const setMemberRole = (role: number) => {
    switch (role) {
        case 0: return '마스터';
        case 1: return '관리자';
        case 2: return '길드원';
    }
}

const GuildResult: React.FC<IGuildResultProps> = ({guild, members, master}) => {
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
                    <Button variant="info" size="sm">길드원 추가</Button>
                </Card.Body>
            </Card>
        </CardGroup>
    )
}

export default GuildResult;