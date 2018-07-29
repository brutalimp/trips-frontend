const LOAD = 'AUTH_LOAD';
const LOAD_SUCCESS = 'AUTH_LOAD_SUCCESS';
const LOAD_FAIL = 'AUTH_LOAD_FAIL';
export const LOGIN = 'AUTH_LOGIN';
export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const LOGOUT = 'AUTH_LOGOUT';

const initialState = {
    loaded: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.result
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case LOGIN:
            return {
                ...state,
                loggingIn: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                user: action.user
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                user: null,
                error: action
            };
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: null
            };
        default:
            return state;
    }
}