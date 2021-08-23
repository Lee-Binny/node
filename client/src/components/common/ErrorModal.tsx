import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IErrorModalProps {
    show: boolean;
    setShow: Function;
    message: string;
}

const ErrorModal: React.FC<IErrorModalProps> = ({ show, message, setShow }) => {
    return (
        <Modal
        show={show}
        centered
        >
            <Modal.Body>
                <p>
                    {message}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal;