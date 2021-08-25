import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import ErrorModal from '../common/ErrorModal';
import axios from 'axios';
import './User.css';

interface ILoginPageProps {
    setLogin: Function
}

const LoginPage: React.FC<ILoginPageProps> = ({setLogin}) => {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'id') {
            setId(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    const onClick = () => {
        axios.post('/user/login', {
            id: id,
            password: password
        })
        .then(res => {
            if (res.data.ok) {
                let guildId: number = 0;
                if (res.data.guild) {
                    guildId = res.data.guild.id;
                }
                setLogin({
                    login: true,
                    id: res.data.login.id,
                    userId: res.data.login.user_id,
                    password: res.data.login.password,
                    name: res.data.login.name,
                    level: res.data.login.level,
                    guildId: guildId
                })
                sessionStorage.setItem('user_id', res.data.login.user_id);
                sessionStorage.setItem('uid', res.data.login.id);
                sessionStorage.setItem('name', res.data.login.name);
                sessionStorage.setItem('guildId', res.data.login.guild_id);
            } else {
                setMessage('not found user');
                setShow(true);
            }
        })
        .catch(err => {
            setMessage(err.error);
            setShow(true);
        })
    }

    return (
        <div>
            <Card className="login-card">
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ID</Form.Label>
                            <Form.Control   
                                type="id" 
                                name="id"
                                value={id} 
                                onChange={onChange}
                                placeholder="Enter Your ID" />
                            <Form.Text className="text-muted password-message">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                value={password} 
                                onChange={onChange}
                                placeholder="Enter Your Password" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="button" onClick={onClick}>
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <ErrorModal 
                show={show}
                setShow={setShow}
                message={message}
            />
        </div>
    )
}

export default LoginPage;