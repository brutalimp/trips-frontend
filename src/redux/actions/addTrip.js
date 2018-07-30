import {
    ASK_FOR_LOCATION, ASK_FOR_LOCATION_SUCCEED, ASK_FOR_LOCATION_FAILED,
    CHANGE_DESCRIPTION, OPENIMAGEPREVIEW, CLOSEIMAGEPREVIEW,
    CHANGEFILELIST, IMAGELOADSTART, IMAGELOADEND
} from '../reducers/addTrip';

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

export const changeDescription = (description) => ({
    type: CHANGE_DESCRIPTION,
    description
})

export const openImagePreview = (previewImage) => ({
    type: OPENIMAGEPREVIEW,
    previewImage
})

export const closeImagePreview = () => ({
    type: CLOSEIMAGEPREVIEW
})

export const changeFileList = (fileList) => ({
    type: CHANGEFILELIST,
    fileList
})

export const imageLoadStart = () => ({
    type: IMAGELOADSTART
})

export const imageLoadEnd = () => ({
    type: IMAGELOADEND
})

