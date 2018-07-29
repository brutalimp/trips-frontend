export const CLEAR_SELECTED_KEYS = 'CLEAR_SELECTED_KEYS';
export const SET_SELECTED_KEYS = 'SET_SELECTED_KEYS';

const initialState = {
    selectedKeys: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case CLEAR_SELECTED_KEYS:
            return [];
        case SET_SELECTED_KEYS:
            return {
                selectedKeys: action.keys
            };
        default:
            return state;
    }
} 