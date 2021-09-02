import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import GuildPage from '../components/guild/GuildPage';
import RaidPage from '../components/raid/RaidPage';
import LoginPage from '../components/user/LoginPage';
import Mypage from '../components/user/MyPage';
import SignUpPage from '../components/user/SignUpPage';
import ErrorModal from '../components/common/ErrorModal';
import axios from 'axios';

const GuildContainer: React.FC = () => {
    const [active, setActive] = useState<string>('home');
    const [show, setShow] = useState<boolean>(false);
    const [signIn, setSignIn] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const onSelect = (eventKey: string | null) => {
        if (eventKey === 'logout') {
            axios.get('/user/logout')
            .then(res => {
                if (res.data.ok) {
                    sessionStorage.clear();
                    setActive('home');
                    setSignIn(false);
                } else {
                    setShow(true);
                    setMessage(res.data.error);
                }
            })
            .catch(err => {
                setShow(true);
                setMessage(err.error);
            });
        } else if (eventKey) {
            setActive(eventKey);
        }
    }

    const setNavComponent = () => {
        switch(active) {
            case 'home': return <GuildPage />;
            case 'raid': return <RaidPage />;
            case 'login': return <LoginPage setActive={setActive} setSignIn={setSignIn} />
            case 'mypage': return <Mypage setActive={setActive} setSignIn={setSignIn} />
            case 'signup': return <SignUpPage setActive={setActive}/>
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('userId') !== null) {
            setSignIn(true);
        } else {
            setSignIn(false);
        }
    }, []);

    return (
        <>
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
                        </Nav>
                        <Nav
                            onSelect={onSelect} 
                        >
                            { signIn ? 
                                <>
                                    <Nav.Link eventKey="mypage">{sessionStorage.getItem('name')}님</Nav.Link>
                                    <Nav.Link eventKey="logout">Log Out</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                                    <Nav.Link eventKey="login">Sign In</Nav.Link>
                                </>
                            }
                        </Nav>
                </Container>
            </Navbar>
            <div className="container contents">
                { setNavComponent() }
            </div>
            <ErrorModal show={show} setShow={setShow} message={message} />
        </>
    )
}

export default GuildContainer;