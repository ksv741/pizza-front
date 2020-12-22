import {CHANGE_CURRENCY, CHANGE_LANG, CLEAR_ERRORS, SET_ERROR, SET_LOADING_STATUS} from "./actionTypes";
import {CurrencyType, LangType} from "../../AppTypes";

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

export function changeLang(lang: LangType) {
    return {type: CHANGE_LANG, lang}
}

export function changeCurrency(currency: CurrencyType) {
    return {type: CHANGE_CURRENCY, currency}
}
