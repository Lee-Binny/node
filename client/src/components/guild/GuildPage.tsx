import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import GuildResult from './GuildResult';
import './Guild.css';

const GuildPage = () => {
    return (
        <div>
            <InputGroup className="mb-3 search-bar">
                <FormControl
                    placeholder="길드명을 입력하세요."
                />
                <Button variant="secondary" id="button-addon2">
                검색
                </Button>
            </InputGroup>
            <GuildResult />
        </div>
    )
}

export default GuildPage;