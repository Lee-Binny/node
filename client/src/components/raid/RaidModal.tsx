import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { CirclePicker, ColorResult } from 'react-color';
import axios from 'axios';

interface IRaidModalProps {
    name: string | null;
    date: string;
    show: boolean;
    mode: string;
    onHide: any;
    setRaid: Function;
}

const RaidModal: React.FC<IRaidModalProps> = ({ name, show, onHide, mode, date, setRaid }) => {
    const [color, setColor] = useState<string>("#f44336");
    const [title, setTitle] = useState<string>("");
    const [boss, setBoss] = useState<number>(1);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onPickColor = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(color.hex);
    }

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBoss(Number(e.target.value));
    }

    const onAdd = () => {
        axios.post('/raid/insert', {
            uid: sessionStorage.getItem('uid'),
            name: sessionStorage.getItem('name'),
            guildId: sessionStorage.getItem('guildId'),
            title: title,
            color: color,
            boss: boss,
            date: date
        })
        .then(res => {
            setRaid({
                id: res.data.result.id.toString(),
                title: res.data.result.title,
                start: res.data.result.start,
                boss: res.data.reuslt.boss,
                color: res.data.result.color
            });
            onHide();
        }).catch(err => {
            console.log(err.error);
        });
    }

    return (
        <Modal
            show={show}
            centered
        >
            <Modal.Header>
                <Modal.Title>
                Raid Schedule
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly defaultValue={date} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Host
                    </Form.Label>
                    <Col sm="10">
                        { name && (
                            <Form.Control type="text" readOnly defaultValue={name} />
                        )}  
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Title
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={onChange} 
                            placeholder="제목을 입력하세요." 
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Boss
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="select" defaultValue="1" onSelect={onSelect}>
                            <option value="1">보스 1</option>
                            <option value="2">보스 2</option>
                            <option value="3">보스 3</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Color</Form.Label>
                    <Col sm="10">
                        <CirclePicker 
                            color={color}
                            onChange={onPickColor}
                        />
                    </Col>
                </Form.Group>
            </Form> 
            </Modal.Body>
            <Modal.Footer>
                {
                    mode === 'insert' ? 
                    <>
                        <Button onClick={onAdd}>Add</Button>
                        <Button variant="secondary" onClick={onHide}>Close</Button>
                    </>
                    : 
                    <>
                        <Button variant="success" onClick={onHide}>Update</Button>
                        <Button variant="secondary" onClick={onHide}>Close</Button>
                    </>
                }
                
            </Modal.Footer>                           
        </Modal>
    )
}

export default RaidModal;