import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import ErrorModal from '../common/ErrorModal';
import axios from 'axios';
import './User.css';

interface IMyPageProps {
    setActive: Function;
    setSignIn: Function;
}

interface IUserInfo {
    userId: string | null;
    name: string | null;
    level: string | null;
    guildName: string | null;
}

const MyPage: React.FC<IMyPageProps> = ({ setActive, setSignIn }) => {
    const [password, setPassword] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [userInfo] = useState<IUserInfo>({
        userId: sessionStorage.getItem('userId'),
        name: sessionStorage.getItem('name'),
        level: sessionStorage.getItem('level'),
        guildName: sessionStorage.getItem('guildName')
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onDelete = () => {
        if (password !== '') {
            axios.post('/user/delete', {
                id: sessionStorage.getItem('uid'),
                password: password
            })
            .then(res => {
                if (res.data.ok) {
                    sessionStorage.removeItem('uid');
                    sessionStorage.removeItem('userId');
                    sessionStorage.removeItem('name');
                    sessionStorage.removeItem('level');
                    sessionStorage.removeItem('guildId');
                    sessionStorage.removeItem('guildName');                   
                    setActive('home');
                    setSignIn(false);
                } else {
                    setMessage('fail to delete user');
                    setShow(true);
                }
            })
            .catch(err => {
                setMessage(err.error);
                setShow(true);
            })
        } else {
            setMessage('Enter Your Password');
            setShow(true);
        } 
    }

    return (
        <div>
            <Card>
                <Card.Header>My Page</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            ID
                            </Form.Label>
                            <Col sm="10">
                                { userInfo.userId && (
                                    <Form.Control plaintext readOnly defaultValue={userInfo.userId} />
                                )}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    type="password" 
                                    value={password}
                                    onChange={onChange} 
                                    placeholder="Enter Your Password."
                                    required    
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            Level
                            </Form.Label>
                            <Col sm="10">
                                { userInfo.level && (
                                    <Form.Control plaintext defaultValue={userInfo.level} />
                                )}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            Name
                            </Form.Label>
                            <Col sm="10">
                                {
                                    userInfo.name && (
                                        <Form.Control plaintext placeholder={userInfo.name} />
                                    )
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            Guild
                            </Form.Label>
                            <Col sm="10">
                                {
                                    userInfo.guildName && (
                                        <Form.Control plaintext placeholder={userInfo.guildName} />
                                    )
                                }
                            </Col>
                        </Form.Group>
                        <div className="button-group">
                            <Button variant="danger" onClick={onDelete}>Delete</Button>
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

export default MyPage;