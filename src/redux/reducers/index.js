import { combineReducers } from 'redux';
import login from './login';
import menus from './menus';
import selfLocation from './selflocation';

export default combineReducers({
    userStatus: login,
    menus,
    selfLocation
})

