import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import GuildPage from '../components/guild/GuildPage';
import RaidPage from '../components/raid/RaidPage';
import LoginPage from '../components/user/LoginPage';
import Mypage from '../components/user/MyPage';
import SignUpPage from '../components/user/SignUpPage';
import ErrorModal from '../components/common/ErrorModal';
import BoardPage from '../components/board/BoardPage';
import axios from 'axios';

export interface ILogin {
    login: boolean;
    id: number;
    userId: string;
    password: string;
    name: string;
    level: number;
}

const GuildContainer: React.FC = () => {
    const [active, setActive] = useState<string>('home');
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [login, setLogin] = useState<ILogin>({
        login: false,
        id: 0,
        userId: '',
        password: '',
        name: '',
        level: 0
    });

    const onSelect = (eventKey: string | null) => {
        if (eventKey === 'logout') {
            axios.get('/user/logout')
            .then(res => {
                if (res.data.ok) {
                    setLogin({
                        login: false,
                        id: 0,
                        userId: '',
                        password: '',
                        name: '',
                        level: 0
                    });
                    setActive('home');
                } else {
                    setShow(true);
                    setMessage(res.data.error);
                }
            })
            .catch(err => {
                setShow(true);
                setMessage(err.error);
                return;
            });
        } else if (eventKey) {
            setActive(eventKey);
        }
    }

    const setNavComponent = () => {
        switch(active) {
            case 'home': return <GuildPage/>;
            case 'raid': return <RaidPage/>;
            case 'board': return <BoardPage name={login.name}/>;
            case 'login': return <LoginPage setLogin={setLogin} />
            case 'mypage': return <Mypage login={login} setLogin={setLogin} setActive={setActive} />
            case 'signup': return <SignUpPage setLogin={setLogin}/>
        }
    }

    useEffect(() => {
        if (login.login) {
            setActive('home');
        }
    }, [login.login]);

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
                            <Nav.Link eventKey="board">Board</Nav.Link>
                        </Nav>
                        <Nav
                            onSelect={onSelect} 
                        >
                            {
                                login.login ? 
                                <>
                                    <Nav.Link eventKey="mypage">{login.name}님</Nav.Link>
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