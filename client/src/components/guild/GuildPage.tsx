import React, { useState } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import GuildResult from './GuildResult';
import './Guild.css';

const GuildPage = () => {
    const [guildName, setGuildName] = useState<string>('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuildName(e.target.value);
    }

    const onClick = () => {
        axios.get('/guild?guildName=' + guildName)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
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
            <GuildResult />
        </div>
    )
}

export default GuildPage;