export const ASK_FOR_LOCATION = 'ASK_FOR_LOCATION';
export const ASK_FOR_LOCATION_SUCCEED = 'ASK_FOR_LOCATION_SUCCEED';
export const ASK_FOR_LOCATION_FAILED = 'ASK_FOR_LOCATION_FAILED';
export const SET_FORMATTED_ADDRESS ='SET_FORMATTED_ADDRESS';


const initialState = {
    position: {
        longitude: 100,
        latitude: 30
    },
    formattedAddress: '未知地点'
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ASK_FOR_LOCATION:
            return {
                ...state,
                askingForLocation: true
            }
        case ASK_FOR_LOCATION_SUCCEED:
            return {
                ...state,
                askingForLocation: false,
                locationAvailable: true,
                position: action.position
            }
        case ASK_FOR_LOCATION_FAILED:
            return {
                ...state,
                askingForLocation:false,
                locationAvailable: false
            } 
        case SET_FORMATTED_ADDRESS: 
            return {
                ...state,
                formattedAddress: action.address
            }       
        default:
            return state;
    }
}
