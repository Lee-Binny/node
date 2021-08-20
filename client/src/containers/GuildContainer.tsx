import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import GuildPage from '../components/guild/GuildPage';
import RaidPage from '../components/raid/RaidPage';

const GuildContainer: React.FC = () => {
    const [active, setActive] = useState<string>('home');
    const onSelect = (eventKey: string | null) => {
        if (eventKey) {
            setActive(eventKey);
        }
    }

    const setNavComponent = () => {
        switch(active) {
            case 'home': return <GuildPage/>;
            case 'raid': return <RaidPage/>;
            case 'board': return null;
        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Guilds</Navbar.Brand>
                        <Nav 
                            className="me-auto"
                            onSelect={onSelect}    
                            activeKey="/home"
                        >
                            <Nav.Link eventKey="home">Home</Nav.Link>
                            <Nav.Link eventKey="raid">Raid</Nav.Link>
                            <Nav.Link eventKey="board">Board</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>
            <div className="container contents">
                { setNavComponent() }
            </div>
        </div>
    )
}

export default GuildContainer;