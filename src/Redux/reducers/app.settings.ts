import {AppSettingsType} from "../../AppTypes";
import {getFromLocalStorage, setToLocalStorage} from "../rootReducer";

const initialState: AppSettingsType = {
    lang: getFromLocalStorage('lang') || 'rus',
    currency: getFromLocalStorage('currency') || 'rub'
}

export default function appSettingReducer(state = initialState, action) {

    switch (action.type) {
        case 'CHANGE_LANG':
            setToLocalStorage('lang', action.lang)
            return {...state, lang: action.lang}

        case 'CHANGE_CURRENCY':
            setToLocalStorage('currency', action.currency)
            return {...state, currency: action.currency}
    }

    return state
}
