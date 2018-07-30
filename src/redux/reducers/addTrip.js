export const ASK_FOR_LOCATION = 'ASK_FOR_LOCATION';
export const ASK_FOR_LOCATION_SUCCEED = 'ASK_FOR_LOCATION_SUCCEED';
export const ASK_FOR_LOCATION_FAILED = 'ASK_FOR_LOCATION_FAILED';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const OPENIMAGEPREVIEW = 'OPENIMAGEPREVIEW';
export const CLOSEIMAGEPREVIEW = 'CLOSEIMAGEPREVIEW';
export const CHANGEFILELIST = 'CHANGEFILELIST';
export const IMAGELOADSTART = 'IMAGELOADSTART';
export const IMAGELOADEND = 'IMAGELOADEND';

const initialState = {
    position: {
        longitude: 100,
        latitude: 30
    },
    formattedAddress: '未知地点',

    previewVisible: false,
    previewImage: '',
    fileList: []

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
                position: action.position,
                formattedAddress: action.formattedAddress ? action.formattedAddress : '未知地点'
            }
        case ASK_FOR_LOCATION_FAILED:
            return {
                ...state,
                askingForLocation: false,
                locationAvailable: false
            }
        case CHANGE_DESCRIPTION:
            return {
                ...state,
                description: action.description
            }
        case OPENIMAGEPREVIEW:
            return {
                ...state,
                previewImage: action.previewImage,
                previewVisible: true
            }
        case CLOSEIMAGEPREVIEW:
            return {
                ...state,
                previewVisible: false
            }
        case CHANGEFILELIST:
            return {
                ...state,
                fileList: action.fileList
            }
        case IMAGELOADSTART: {
            return {
                ...state,
                loading: true
            }
        }
        case IMAGELOADEND: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state;
    }
}

