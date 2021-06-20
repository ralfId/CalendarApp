import React from 'react'
import { useState } from 'react';
import Modal from 'react-modal';

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

export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(false)
    }
    
    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            closeTimeoutMS={200}
            overlayClassName="modal-fondo"
        >
            <h2 >Hello to react modal</h2>
            <div>I am a modal</div>
            
        </Modal>
    )
}
