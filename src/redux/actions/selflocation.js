import { ASK_FOR_LOCATION, ASK_FOR_LOCATION_SUCCEED, ASK_FOR_LOCATION_FAILED, SET_FORMATTED_ADDRESS } from '../reducers/selflocation';

export const askForLocation = () => ({
    type: ASK_FOR_LOCATION,
})

export const askForLocationSucceed = (position) => ({
    type: ASK_FOR_LOCATION_SUCCEED,
    position
})

export const askForLocationFailed = () => ({
    type: ASK_FOR_LOCATION_FAILED
})

export const setFormattedAddress =(address) => ({
    type: SET_FORMATTED_ADDRESS,
    address
})
