import { CLEAR_SELECTED_KEYS, SET_SELECTED_KEYS } from '../reducers/menus';

export const clearSelectedKeys = () => ({
      type: CLEAR_SELECTED_KEYS
})

export const setSelectedKeys =(key) => ({
     type: SET_SELECTED_KEYS,
     keys: [key]
})