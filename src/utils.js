export function fieldServerError(error, errcode) {
    if (error && error.errcode == errcode) 
    return error.errmsg;
}