import {AppSettingsType} from "../../AppTypes";
import {getFromLocalStorage, setToLocalStorage} from "../rootReducer";
import pepperoniImg from "../../static/images/pizza/pepperoni.jpeg";
import bavariaImg from "../../static/images/pizza/bavaria.jpeg";
import margaritaImg from "../../static/images/pizza/margarita.png";
import {
    CHANGE_CURRENCY,
    CHANGE_LANG,
    CLEAR_ERRORS,
    GET_HISTORY,
    SET_ERROR,
    SET_LOADING_STATUS
} from "../actions/actionTypes";

const initialState: AppSettingsType = {
    lang: getFromLocalStorage('lang') || 'rus',
    currency: getFromLocalStorage('currency') || 'rub',
    menu: [
        {
            alias: 'Pepperoni',
            title: 'Pepperoni',
            description: 'Super Giper Pepperoni',
            price: {
                sum: 13,
                currency: 'usd'
            },
            image: pepperoniImg
        },
        {
            alias: 'Bavaria',
            title: 'Bavaria',
            description: 'Super Giper Bavaria',
            price: {
                sum: 13,
                currency: 'usd'
            },
            image: bavariaImg
        },
        {
            alias: 'Margarita',
            title: 'Margarita',
            description: 'Super Giper Margarita',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: margaritaImg
        },
        {
            alias: 'Margarita2',
            title: 'Margarita',
            description: 'Super Giper Margarita',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: margaritaImg
        },
        {
            alias: 'Margarita3',
            title: 'Margarita',
            description: 'Super Giper Margarita',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: margaritaImg
        }
    ] || [],
    isLoading: false,
    error: null,
    history: [],
}

export default function appSettingReducer(state = initialState, action): AppSettingsType {

    switch (action.type) {
        case CHANGE_LANG:
            setToLocalStorage('lang', action.lang)
            return {...state, lang: action.lang}

        case CHANGE_CURRENCY:
            setToLocalStorage('currency', action.currency)
            return {...state, currency: action.currency}

        case SET_LOADING_STATUS:
            return {...state, isLoading: action.payload}

        case SET_ERROR:
            return {...state, error: action.payload}

        case CLEAR_ERRORS:
            return {...state, error: null}

        case GET_HISTORY:
            return {...state, history: action.payload}
    }

    return state
}
