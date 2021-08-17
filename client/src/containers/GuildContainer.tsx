import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import GuildPage from '../components/guild/GuildPage';

const GuildContainer = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Guilds</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>
            <div className="container contents">
                <GuildPage/>
            </div>
        </div>
    )
}

export default GuildContainer;