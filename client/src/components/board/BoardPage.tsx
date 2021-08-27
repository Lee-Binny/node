import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import './Board.css';
import BoardList from './BoardList';
import BoardWrite from './BoardWrite';

const BoardPage: React.FC = () => {
    const [mode, setMode] = useState<string>('list');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setGuildName(e.target.value);
    }

    const onClick = () => {
        setMode('write')
    }

    const setBoardComponent = () => {
        switch (mode) {
            case 'list': return <BoardList />;
            case 'write': return <BoardWrite setMode={setMode} />;
        }
    }

    return (
        <Card className="board-card">
            <Card.Header>
                {
                    mode === 'list' ? <>Board List</> : <>Board Write</>
                }
            </Card.Header>
            <Card.Body>
                {
                    mode === 'list' && (
                        <span className="button-section">
                            <Button size="sm" onClick={onClick}>글쓰기</Button>
                        </span>
                    )
                }
                { setBoardComponent() }             
            </Card.Body>
        </Card>
    )
}

export default BoardPage;