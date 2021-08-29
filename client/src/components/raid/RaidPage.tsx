import React, { useEffect, useState } from 'react';
import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import InteractionPlugin from '@fullcalendar/interaction';
import RaidModal from './RaidModal';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const RaidPage: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [mode, setMode] = useState<string>('insert');
    const [raid, setRaid] = useState<EventInput[]>([]);

    const getRaids = () => {
        let raids: EventInput[] = [];
        if (sessionStorage.getItem('guildId') && sessionStorage.getItem('guildId') !=='0') {
            axios.get('/raid?guildId=' + sessionStorage.getItem('guildId'))
            .then(res => {
                if (res.data.ok) {
                    res.data.result.map((value: any) => {
                        let newRaid: EventInput = ({
                            id: value.id.toString(),
                            boss: value.boss_id,
                            title: '[' + value.boss_id + '] ' + value.title,
                            start: value.date,
                            color: value.color,
                            allDay: true
                        })
                        raids.push(newRaid);
                    })
                }
                setRaid(raids)
            })
            .catch(err => {
                console.log(err.error);
            })
        }    
    };

    const onHide = () => {
        setShow(false);
    };

    const onDayClick = (arg: any) => {
        setDate(arg.dateStr);
        setMode('insert');
        setShow(true);
    }

    const onEventClick = (arg: EventClickArg) => {
        setMode('update');
        setShow(true);
    }

    useEffect(() => {
        getRaids();
    }, [show])

    return (
        <div>
            {
                !sessionStorage.getItem('guildId') ? 
                <Alert variant="danger">
                    There are no guilds joined.
                </Alert>
                :
                <>
                    <FullCalendar
                        plugins={[ dayGridPlugin, InteractionPlugin ]}
                        initialView="dayGridMonth"
                        dateClick={onDayClick}
                        eventClick={onEventClick}
                        events={raid}
                    />
                    {
                        <RaidModal 
                            name={sessionStorage.getItem('name')} 
                            date={date} 
                            show={show} 
                            mode={mode} 
                            onHide={onHide} 
                        />
                    }
                    
                </>
            }    
        </div>
    )
}

export default RaidPage;