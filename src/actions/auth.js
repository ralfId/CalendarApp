import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/customFetch"
import { types } from "../types/types";
import { clearCalendarState } from "./events";

export const startLogin = (email, password) => {

    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-Date', new Date().getTime());
            dispatch(login({ token: body.token, uid: body.uid }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/register', { name, email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-Date', new Date().getTime());
            dispatch(login({ token: body.token, uid: body.uid }))

        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {

    return async (dispatch) => {
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-Date', new Date().getTime());
            dispatch(login({ token: body.token, uid: body.uid, name: body.name }))

        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })
const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {

    return async (dispatch) => {
        localStorage.clear();
        dispatch(clearCalendarState())
        dispatch(logout());
    }
}

const logout = () => ({ type: types.authLogout })
