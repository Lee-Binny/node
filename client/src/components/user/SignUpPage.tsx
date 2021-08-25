import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import ErrorModal from '../common/ErrorModal';
import axios from 'axios';
import './User.css';

interface ISignUpPageProps {
    setLogin: Function;
}

interface ISingUp {
    userId: string;
    password: string;
    confirm: string;
    name: string;
}

const SignUpPage: React.FC<ISignUpPageProps> = ({setLogin}) => {
    const [show, setShow] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const { handleSubmit, setValue } = useForm<ISingUp>({
        defaultValues: {
            userId: '',
            password: '',
            confirm: '',
            name: ''
        }
    });
    
    const onSubmit = (data: ISingUp) => {
        if (data.password === data.confirm) {
            axios.post('/user/signup', {
                data
            })
            .then(res => {
                if (res.data.ok) {
                    setLogin({
                        login: true,
                        id: res.data.result.id,
                        userId: res.data.result.user_id,
                        password: res.data.result.password,
                        name: res.data.result.name,
                        level: res.data.result.level,
                        guildId: 0
                    })
                } else {
                    setMessage('already exist id or name');
                    setShow(true);
                }
            })
            .catch(err => {
                setMessage(err.error);
                setShow(true);
            })
            setConfirm(true);
        } else {
            setConfirm(false);
        }
    };

    return (
        <div>
            <Card>
                <Card.Header>Sign Up</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            ID
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    type="text" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue('userId', e.target.value);
                                    }}
                                    placeholder="Enter Your ID."
                                    required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    type="password" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue('password', e.target.value);
                                    }}
                                    placeholder="Enter Your Password."
                                    required    
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"/>
                            <Col sm="10">
                                <Form.Control 
                                    type="password" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue('confirm', e.target.value);
                                    }}
                                    placeholder="Cofirm Your Password."
                                    required    
                                />
                                {
                                    !confirm && (
                                        <Form.Text className="text-muted password-message">
                                            Passwords do not match.
                                        </Form.Text>
                                    ) 
                                }
                                
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                            Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    name="name"
                                    type="text" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue('name', e.target.value);
                                    }}
                                    placeholder="Enter Your Name."
                                    required    
                                />
                            </Col>
                        </Form.Group>
                        <div className="button-group">
                            <Button type="submit">Sign Up</Button>
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

export default SignUpPage;