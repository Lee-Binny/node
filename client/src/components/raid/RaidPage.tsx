import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const RaidPage = () => {
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
            />
        </div>
    )
}

export default RaidPage;