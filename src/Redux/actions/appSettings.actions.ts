import {CLEAR_ERRORS, SET_ERROR, SET_LOADING_STATUS} from "./actionTypes";

export function setLoading(state: boolean) {
    return {
        type: SET_LOADING_STATUS,
        payload: state
    }
}

export function setError(message: string) {
    return {
        type: SET_ERROR,
        payload: message
    }
}

export function clearErrors() {
    return {
        type: CLEAR_ERRORS,
    }
}
