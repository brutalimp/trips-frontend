import { STARTGETTRIPS, GETTRIPSSUCCEED, GETTRIPSFAILED, LOADIMAGESUCCEED} from '../reducers/trips';

export const startGetTrips = () => ({
    type: STARTGETTRIPS,
    
})   

export const getTripsSucceed = (trips) => ({
    type: GETTRIPSSUCCEED,
    tripList : trips
})

export const getTripsFailed = () =>({
    type: GETTRIPSFAILED,
    getTripsSucceed: false
})

export const loadImageSucceed = (index, image, url)=>({
    type: LOADIMAGESUCCEED,
    image,
    index,
    url
})

