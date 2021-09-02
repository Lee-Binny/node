import axios from 'axios';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IGuildModalProps {
    show: boolean;
    setShow: Function;
    guildName: string;
    guildId: number;
}

const GuildModal: React.FC<IGuildModalProps> = ({ show, guildName, guildId, setShow }) => {
    const onClick = () => {
        axios.post('/guild/member/insert', {
            guildId: guildId,
            userId: sessionStorage.getItem('uid'),
            userName: sessionStorage.getItem('name')
        })
        .then(res => {
            if (res.data.ok) {
                sessionStorage.setItem('guildId', guildId.toString());
                sessionStorage.setItem('guildName', guildName);
                setShow(false);
            }
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
                Insert Guild Member
            </Modal.Header>
            <Modal.Body>
                <p>
                    '{guildName}'길드에 가입하시겠습니까?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClick}>Insert</Button>
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GuildModal;