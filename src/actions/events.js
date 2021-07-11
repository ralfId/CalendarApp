import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/customFetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartLoad = () => {
    return async (dispatch) => {
        try {

            const resp = await fetchWithToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.events);
            dispatch(eventsLoad(events))

        } catch (error) {
            console.log(error)
        }
    }
}

const eventsLoad = (events) => ({
    type: types.eventLoadEvents,
    payload: events
})



export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        try {
            const { uid, name } = getState().auth;

            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();


            if (body.ok) {
                event.id = body.evento.id;
                event.user = { uid, name }

                dispatch(eventAddNew(event))
            }

        } catch (error) {
            console.log(error)
        }
    }
};

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


export const eventStartUpdate = (event) => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventUpdated(event));

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your event has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: body.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        try {
            const { id } = getState().calendar.activeEvent;
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventDeleted());

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your event has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: body.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}
 const eventDeleted = () => ({ type: types.eventDeleted })

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});
export const eventCleanActive = () => ({ type: types.eventCleanActive })