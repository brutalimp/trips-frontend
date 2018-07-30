import { combineReducers } from 'redux';
import login from './login';
import menus from './menus';
import addTrip from './addTrip';

export default combineReducers({
    userStatus: login,
    menus,
    addTrip
})

