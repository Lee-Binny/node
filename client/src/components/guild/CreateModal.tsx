import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface ICreateModalProps {
    show: boolean;
    setShow: Function;
}

const CreateModal: React.FC<ICreateModalProps> = ({ show, setShow }) => {
    const [name, setName] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onClick = () => {
        axios.post('/guild/insert', {
            name: name,
            uid: sessionStorage.getItem('uid'),
        })
        .then(res => {
            sessionStorage.setItem('guildId', res.data.guild.insertId.toString());
            sessionStorage.setItem('guildName', name);
            setShow(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <Modal
        show={show}
        centered
        >
            <Modal.Header>
                Create Guild
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control value={name} onChange={onChange} />
                    </Col>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClick}>Insert</Button>
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateModal;