import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const NavBar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }
    
    return (
        <div className="navbar navbar-dark bg-dark mb-4">

            <span className="text-white"> {name} </span>

            <button className="btn btn-outline-danger" onClick={handleLogout}>
                <li className="fas fa-sign-out-alt"></li>
                <span> Salir</span>
            </button>
        </div>
    )
}
