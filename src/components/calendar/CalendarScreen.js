import React from 'react'
import { NavBar } from '../ui/NavBar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages_es } from '../../helpers/calendar-settings-es';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';

const localizer = momentLocalizer(moment)

const myEventsList = [{
    title: 'Cumpleaños de Eduardo',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes:'comprar el pastel',
    user:{
        uid: '12abc',
        name: 'Rafael'
    }
}]


export const CalendarScreen = () => {
    
    const [lastView, setLastView] = useState( localStorage.getItem('lastView'))

    const onViewChage = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e);
    }

    
    const onSelectedEvent = () => {
        
    }
    
    const onDoubleClick = () => {
        
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

    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                messages={messages_es}
                eventPropGetter={eventStyleGetter}
                components={{event: CalendarEvent}}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectedEvent}
                onView={onViewChage}
                view={lastView}
            />
        </div>
    )
}
