import React, { useCallback, useEffect, useState } from 'react';
import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import InteractionPlugin from '@fullcalendar/interaction';
import RaidModal from './RaidModal';
import { ILogin } from '../../containers/GuildContainer';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

interface IRaidPageProps {
    login: ILogin;
}

interface IRaid {
    id: number;
    title: string;
    boss: number;
    start: string;
    color: string;
}

const RaidPage: React.FC<IRaidPageProps> = ({ login }) => {
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [mode, setMode] = useState<string>('insert');
    const [raid, setRaid] = useState<IRaid | null>(null);
    // const addRaid = (raid: IRaid, selectInfo: DateSelectArg) => {
    //     let calendarApi = selectInfo.view.calendar;
    //     calendarApi.unselect();
    //     calendarApi.addEvent({
    //         id: raid.id.toString(),
    //         title: '[' + raid.boss + '] ' + raid.title,
    //         start: raid.start,
    //         allDay: true
    //     });
    // }

    const getRaids = () :any => {
        let raids: EventInput[] = [];
        axios.get('/raid?guildId=' + login.guildId)
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
            console.log(raids);
            return raids;
        })
        .catch(err => {
            console.log(err.error);
            return null;
        })
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

    return (
        <div>
            {
                login.guildId === 0 ? 
                <Alert variant="danger">
                    There are no guilds joined.
                </Alert>
                :
                <>
                    <FullCalendar
                        plugins={[ dayGridPlugin, InteractionPlugin ]}
                        initialView="dayGridMonth"
                        initialEvents={getRaids()}
                        dateClick={onDayClick}
                        eventClick={onEventClick}
                    />
                    <RaidModal login={login} date={date} show={show} mode={mode} onHide={onHide} setRaid={setRaid}/>
                </>
            }    
        </div>
    )
}

export default RaidPage;