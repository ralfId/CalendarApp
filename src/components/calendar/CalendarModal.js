import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventCleanActive, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root')
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const end = now.clone().add(1, 'hours');

const initFormEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: end.toDate(),
};

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)

    const [isValid, setIsValid] = useState(true)
    // const [isOpen, setIsOpen] = useState(true)
    const [startDate, setStartDate] = useState(now.toDate())
    const [endDate, setEndDate] = useState(end.toDate())
    const [formValues, setFormValues] = useState(initFormEvent)

    const { title, notes, start: dateStart, end: dateEnd } = formValues;

    useEffect(() => {
        
        if (activeEvent){
            setFormValues(activeEvent)
        }else{
            setFormValues(initFormEvent)
        }
    }, [activeEvent, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }


    const closeModal = () => {
        dispatch(uiCloseModal());
        setFormValues(initFormEvent);
        dispatch(eventCleanActive())
    }

    const handleEndDateChange = (e) => {
        setEndDate(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleStartDateChange = (e) => {
        setStartDate(e)
        setFormValues({
            ...formValues,
            start: e,
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const startMoment = moment(dateStart);
        const endMoment = moment(dateEnd);

        if (startMoment.isSameOrAfter(endMoment)) {
            return Swal.fire('Error', 'the end date time should be greater than start date time', 'error');
        }
        if (title.trim().length < 2) {
            return setIsValid(false)
        }

        setIsValid(true);

        //TODO: realizar grabacion en BD
        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {     
            dispatch(eventStartAddNew(formValues));
        }

        closeModal()
    }



    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            closeTimeoutMS={200}
            overlayClassName="modal-fondo"
        >
            <h1> 
                {
                    (activeEvent)
                    ? 'Editar Evento' : 'Nuevo evento'
                
                } 
            </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={startDate}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleEndDateChange}
                        value={endDate}
                        minDate={startDate}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control  ${!isValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
