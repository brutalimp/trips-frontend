import { combineReducers } from 'redux';
import login from './login';
import menus from './menus';
import addTrip from './addTrip';
import trips from './trips';

export default combineReducers({
    userStatus: login,
    menus,
    addTrip,
    trips
})

