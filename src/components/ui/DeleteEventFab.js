import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDeleteEvent = () => {
        dispatch(eventStartDelete());
    }
    
    return (
        <button className="btn btn-danger fab-btn-delete" onClick={handleDeleteEvent}>
            <i className="fas fa-trash"></i>
            &nbsp; Delete event
        </button>
    )
}
