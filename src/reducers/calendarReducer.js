import moment from "moment";
import { types } from "../types/types";


const initialState =
{
    events: [{
        id: new Date().getDate(),
        title: 'Cumpleaños de Eduardo',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'comprar el pastel',
        user: {
            uid: '12abc',
            name: 'Rafael'
        }
    }],
    activeEvent: null,
}

// const initialState = {
//     events: [],
//     activeEvent: null
// };

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventCleanActive:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(e => (e.id === action.payload.id) ? action.payload : e),
                activeEvent: null
            }
            
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(e => (e.id !== state.activeEvent.id) ),
                activeEvent: null
            }
        
        case types.eventLoadEvents:
            return{
                ...state,
                events: [ ...action.payload]
            }
            
        default:
            return state;
    }







}
