import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../reducers/login';
import { history } from '../../history'
import fetch from '../../fetchclient';

export const logIn = () => ({
    type: LOGIN,
})

export const logInSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user
})

export const logInFailed = (error) => ({
    type: LOGIN_FAIL,
    error
})

export const startLogIn = (user) => {
    return dispatch => {
        dispatch(logIn());
        return fetch.post('Login', user)
            .then(res => { dispatch(logInSuccess(res.data.data.user)); localStorage.setItem('token', res.data.data.token); history.push(''); },
                (err) => { dispatch(logInFailed(err.response.data)) });
    }

}

export const startLogInByAuth = () => {
    return dispatch => {
        return fetch.get('LoginByAuth')
            .then(res => { dispatch(logInSuccess(res.data.data)) },
                (err) => { dispatch(logInFailed(err.response.data)); localStorage.clear('token') });
    }

}

export const logOut = () => ({
    type: LOGOUT,
})