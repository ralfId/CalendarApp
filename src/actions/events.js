import { fetchWithToken } from "../helpers/customFetch";
import { types } from "../types/types";

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

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventCleanActive = () => ({ type: types.eventCleanActive })

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({ type: types.eventDeleted })