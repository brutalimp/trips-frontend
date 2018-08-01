export const LOGIN = 'AUTH_LOGIN';
export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const LOGOUT = 'AUTH_LOGOUT';
export const RENEWFORM = 'RENEWFORM';

const initialState = {
    loaded: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
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
                error: action.error
            };
        case RENEWFORM: {
            return {
                ...state,
                error: null
            }
        }    
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