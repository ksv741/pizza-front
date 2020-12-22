import {ADD_TOAST_TO_ENQUEUE, REMOVE_TOAST_FROM_ENQUEUE} from "./actionTypes";

export function removeToast(alias) {
    return {type: REMOVE_TOAST_FROM_ENQUEUE, payload: alias}
}
export function addToast(alias) {
    return {type: ADD_TOAST_TO_ENQUEUE, payload: alias}
}
