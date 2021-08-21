import React, { useState } from 'react';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import InteractionPlugin from '@fullcalendar/interaction';
import RaidModal from './RaidModal';

const RaidPage: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [mode, setMode] = useState<string>('insert');
    const onHide = () => {
        setShow(false);
    }

    const onDayClick = (arg: any) => {
        setDate(arg.dateStr);
        setMode('insert');
        setShow(true);
    }

    const onEventClick = (arg: EventClickArg) => {
        console.log(arg);
        setMode('update');
        setShow(true);
    }

    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin, InteractionPlugin ]}
                initialView="dayGridMonth"
                dateClick={onDayClick}
                eventClick={onEventClick}
                events={[
                    {title: 'boss1', date: '2021-08-13', color: '#7e338b'}
                ]}
            />
            <RaidModal date={date} show={show} mode={mode} onHide={onHide} />
        </div>
    )
}

export default RaidPage;