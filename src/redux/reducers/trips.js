export const STARTGETTRIPS = 'STARTGETTRIPS';
export const GETTRIPSSUCCEED = 'GETTRIPSSUCCEED';
export const GETTRIPSFAILED = 'GETTRIPSFAILED';
export const LOADIMAGESUCCEED = 'LOADIMAGESUCCEED';

const initialState = {
    gettingTrips: true
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case STARTGETTRIPS:
            return {
                ...state,
                gettingTrips: true
            }
        case GETTRIPSSUCCEED:
            action.tripList.map((trip)=> {
                trip.imagesStatus = {};
                trip.images.map((image)=> {
                    trip.imagesStatus[image] = {};
                    trip.imagesStatus[image].loaded = false;
                })
            })
            return {
                ...state,
                getTripsSucceed: true,
                gettingTrips: false,
                tripList: action.tripList,
            }
        case GETTRIPSFAILED:
            return {
                ...state,
                gettingTrips: false,
                getTripsSucceed: false,
            }
        case LOADIMAGESUCCEED :
            const tripList = state.tripList.slice();
            tripList[action.index].imagesStatus[action.image].loaded = true;
            tripList[action.index].imagesStatus[action.image].url = action.url;
            return {
                ...state,
                tripList
            }
        default:
            return state;
    }
}