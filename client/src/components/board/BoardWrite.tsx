import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import ErrorModal from '../common/ErrorModal';
import './Board.css';

interface IBoardWriteProps {
    name: string;
    setMode: Function;
}

interface IWrite {
    title: string;
    desc: string;
    name: string;
}

const BoardPage: React.FC<IBoardWriteProps> = ({ name, setMode }) => {
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const { handleSubmit, setValue } = useForm<IWrite>({
        defaultValues: {
            title: '',
            desc: '',
            name: name
        }
    });

    const onSubmit = (data: IWrite) => {
        axios.post('/board/write', {
            data
        })
        .then(res => {
            if (res.data.ok) {
                setMode('read');
            } else {
                setMessage('already exist id or name');
                setShow(true);
            }
        })
        .catch(err => {
            setMessage(err.error);
            setShow(true);
        })
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="제목을 입력하세요."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue('title', e.target.value);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        className="board-text" 
                        as="textarea" rows={3}
                        placeholder="내용을 입력하세요."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue('desc', e.target.value);
                        }}
                        required
                    />
                </Form.Group>
                <div className="button-section">
                    <Button size="sm" type="submit">write</Button>
                </div>
            </Form>
            <ErrorModal 
                show={show}
                setShow={setShow} 
                message={message}
            />
        </>
    )
}

export default BoardPage;