import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const GuildResult = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>길드명</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default GuildResult;