import React, { useState } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import GuildResult from './GuildResult';
import './Guild.css';

export interface IGuild {
    id: number;
    name: string;
    level: number;
    masterId: number;
    createdDate: Date;
}

export interface IGuildMembers {
    id: number;
    guildId: number;
    userId: number;
    userName: string;
    role: number;
}

export interface IMaster {
    name: string;
    level: number;
}

const setGuildMembers = (members: any[]) => {
    let guildMembers: IGuildMembers[] = [];
    members.forEach(value => {
        let newMember: IGuildMembers;
        newMember = {
            id: value.id,
            guildId: value.guild_id,
            userId: value.user_id,
            userName: value.user_name,
            role: value.role
        }
        guildMembers.push(newMember);
    })
    return guildMembers;
}

const GuildPage: React.FC = () => {
    const [guildName, setGuildName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [guild, setGuild] = useState<IGuild | null>(null);
    const [master, setMaster] = useState<IMaster | null>(null);
    const [members, setMembers] = useState<IGuildMembers[] | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuildName(e.target.value);
    }

    const onClick = () => {
        axios.get('/guild?guildName=' + guildName)
        .then(res => {
            console.log(res.data);
            if (res.data.ok) {
                setGuild({
                    id: res.data.guild.id,
                    name: res.data.guild.name,
                    level: res.data.guild.level,
                    masterId: res.data.guild.master_id,
                    createdDate: res.data.guild.created_date
                });
                setMaster({
                    name: res.data.master.name,
                    level: res.data.master.level
                });
                setMembers(setGuildMembers(res.data.members));
                setError(null);
            } else {
                setGuild(null);
                setMaster(null);
                setMembers(null);
                setError('not found guild');
            }
        })
        .catch(err => {
            setGuild(null);
            setMembers(null);
            setError(err.error);
        }) 
    }
    return (
        <div>
            <InputGroup className="mb-3 search-bar">
                <FormControl
                    name="guildName"
                    type="text"
                    value={guildName}
                    onChange={onChange}
                    placeholder="길드명을 입력하세요."
                />
                <Button 
                    variant="secondary"
                    onClick={onClick}
                >
                    검색
                </Button>
            </InputGroup>
            {
                guild && members && master && (
                    <GuildResult guild={guild} master={master} members={members}/>
                )
            }
            {
                error && (
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                )
            }
        </div>
    )
}

export default GuildPage;