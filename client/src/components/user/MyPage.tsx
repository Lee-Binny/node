import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import ErrorModal from '../common/ErrorModal';
import axios from 'axios';
import './User.css';
import { ILogin } from '../../containers/GuildContainer';

interface IMyPageProps {
    login: ILogin;
    setLogin: Function;
    setActive: Function;
}

const MyPage: React.FC<IMyPageProps> = ({ login, setLogin, setActive }) => {
    const [password, setPassword] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onDelete = () => {
        if (password !== '') {
            axios.post('/user/delete', {
                id: login.id,
                password: password
            })
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
                                <Form.Control plaintext readOnly defaultValue={login.userId} />
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
                                <Form.Control plaintext defaultValue={login.level} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext placeholder={login.name} />
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