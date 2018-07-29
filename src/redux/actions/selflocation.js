import { ASK_FOR_LOCATION, ASK_FOR_LOCATION_SUCCEED, ASK_FOR_LOCATION_FAILED } from '../reducers/selflocation';

export const askForLocation = () => ({
    type: ASK_FOR_LOCATION,
})

export const askForLocationSucceed = (location) => ({
    type: ASK_FOR_LOCATION_SUCCEED,
    position: location.position,
    formattedAddress: location.formattedAddress
})

export const askForLocationFailed = () => ({
    type: ASK_FOR_LOCATION_FAILED
})

