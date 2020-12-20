import {AppSettingsType} from "../../AppTypes";
import {getFromLocalStorage, setToLocalStorage} from "../rootReducer";
import pepperoniImg from "../../static/images/pizza/pepperoni.jpeg";
import bavariaImg from "../../static/images/pizza/bavaria.jpeg";
import margaritaImg from "../../static/images/pizza/margarita.png";

const initialState: AppSettingsType = {
    lang: getFromLocalStorage('lang') || 'rus',
    currency: getFromLocalStorage('currency') || 'rub',
    menu: [
        {
            alias: 'Pepperoni',
            title: 'Pepperoni',
            description: 'Super Giper Pepperoni',
            price: {
                summ: 13,
                currency: 'usd'
            },
            image: pepperoniImg
        },
        {
            alias: 'Bavaria',
            title: 'Bavaria',
            description: 'Super Giper Bavaria',
            price: {
                summ: 13,
                currency: 'usd'
            },
            image: bavariaImg
        },
        {
            alias: 'Margarita',
            title: 'Margarita',
            description: 'Super Giper Margarita',
            price: {
                summ: 9,
                currency: 'eur'
            },
            image: margaritaImg
        },
        {
            alias: 'Margarita2',
            title: 'Margarita',
            description: 'Super Giper Margarita',
            price: {
                summ: 9,
                currency: 'eur'
            },
            image: margaritaImg
        },
        {
            alias: 'Margarita3',
            title: 'Margarita',
            description: 'Super Giper Margarita',
            price: {
                summ: 9,
                currency: 'eur'
            },
            image: margaritaImg
        }
    ] || []
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
