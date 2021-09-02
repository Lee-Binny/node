import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { CirclePicker, ColorResult } from 'react-color';
import { IRaid } from './RaidPage';
import axios from 'axios';

interface IRaidModalProps {
    name: string | null;
    date: string;
    show: boolean;
    mode: string;
    onHide: any;
    raid: IRaid;
}

const RaidModal: React.FC<IRaidModalProps> = ({ name, show, onHide, mode, date, raid }) => {
    const [color, setColor] = useState<string>('#f44336');
    const [title, setTitle] = useState<string>('');
    const [boss, setBoss] = useState<number>(1);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onPickColor = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(color.hex);
    }

    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            if (res.data.ok) {
                onHide();
            }
        }).catch(err => {
            console.log(err.error);
        });
    }

    const onUpdate = () => {
        axios.post('/raid/update', {
            id: raid?.id,
            title: title,
            boss: boss,
            color: color
        })
        .then(res => {
            if (res.data.ok) {
                onHide();
            }
        }).catch(err => {
            console.log(err.error);
        });
    }

    useEffect(() => {
        if (mode === 'update') {
            setColor(raid.color);
            setTitle(raid.title);
            setBoss(raid.boss);
        } else {
            setColor('#f44336');
            setTitle('');
            setBoss(1);
        }
    }, []);

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
                        {
                            mode === 'insert' && name ? 
                            <Form.Control type="text" readOnly defaultValue={name} />
                            : 
                            <Form.Control type="text" readOnly defaultValue={raid?.name} />
                        } 
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Title
                    </Form.Label>
                    <Col sm="10">
                        {
                            mode === 'insert' ? 
                            <Form.Control 
                                type="text" 
                                value={title} 
                                onChange={onChange} 
                                placeholder="제목을 입력하세요." 
                                required
                            />
                            : 
                            <Form.Control 
                                type="text" 
                                defaultValue={raid?.title}
                                onChange={onChange} 
                                required
                            />
                        }
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Boss
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="select" defaultValue={ mode === 'insert' ? '1' : raid?.boss.toString()} onChange={onSelect}>
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
                    mode === 'insert' && (
                        <Button onClick={onAdd}>Add</Button>
                    )
                }
                {
                    mode === 'update' && sessionStorage.getItem("name") === raid?.name && (
                        <Button variant="success" onClick={onUpdate}>Update</Button>
                    )  
                }     
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RaidModal;