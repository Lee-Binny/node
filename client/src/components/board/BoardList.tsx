import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './Board.css';

interface IBoard {
    id: number;
    title: string;
    desc: string;
    name: string;
    date: Date;
}

const BoardList: React.FC = () => {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const getBoards = (): any => {
        let boardList: IBoard[] = [];
        axios.get('/board')
        .then(res => {
            if (res.data.ok) {
                console.log(res.data);
                res.data.result.map((value: any, index: number) => {
                    let newBoard: IBoard = ({
                        id: value.id,
                        title: value.title,
                        desc: value.descript,
                        name: value.name,
                        date: value.created_date
                    })
                    boardList.push(newBoard);
                })
                return boardList;
            }
        })
        .catch(err => {
            console.log(err);
            return boardList;
        })
    }
    
    useEffect(() => {
        const boardsList = getBoards();
        setBoards(boardsList);
    }, []);

    return (
        <Table responsive="sm" hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Writer</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    boards && (
                        boards.map((value: IBoard, index: number) => {
                            console.log(value, index)
                        })
                    )
                }
            </tbody>
        </Table>
    )
}

export default BoardList;