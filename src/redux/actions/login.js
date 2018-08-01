import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, RENEWFORM } from '../reducers/login';
import { history } from '../../history';
import { message } from 'antd';
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

export const renewForm = () => ({
    type: RENEWFORM
})

export const startLogIn = (user) => {
    return dispatch => {
        dispatch(logIn());
        return fetch.post('Login', user)
            .then(res => {
                message.success('登陆成功.');
                dispatch(logInSuccess(res.data.data.user));
                localStorage.setItem('token', res.data.data.token);
                history.push('');
            },
                (err) => {
                    if (err.response) {
                        dispatch(logInFailed(err.response.data))
                    } else {
                        message.error('未知错误，登陆失败');
                    }
                });
    }

}

export const startLogInByAuth = () => {
    return dispatch => {
        return fetch.get('LoginByAuth')
            .then(res => { dispatch(logInSuccess(res.data.data)) },
                (err) => { dispatch(logInFailed(err.data)); localStorage.clear('token') });
    }

}

export const logOut = () => ({
    type: LOGOUT,
})