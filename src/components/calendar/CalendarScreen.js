import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { messages_es } from '../../helpers/calendar-settings-es';
import { NavBar } from '../ui/NavBar'
import { uiOpenModal } from '../../actions/ui';
import { eventCleanActive, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);

// const myEventsList = [{
//     title: 'Cumpleaños de Eduardo',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes:'comprar el pastel',
//     user:{
//         uid: '12abc',
//         name: 'Rafael'
//     }
// }]


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onViewChage = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e);
    }


    const onSelectedEvent = (e) => {
        dispatch(eventSetActive(e))
        // dispatch(uiOpenModal());
    }

    const onDoubleClick = () => {
        dispatch(uiOpenModal())
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#aa00ff',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return { style }
    }

    const onSelectSlot = (e) => {
        if (activeEvent) {
            dispatch(eventCleanActive())
        }else{
            dispatch(uiOpenModal())
        }
    }

    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages_es}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectedEvent}
                onView={onViewChage}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
            />
            <AddNewFab />
            {
                (activeEvent) && <DeleteEventFab />

            }
            <CalendarModal />

        </div>
    )
}

