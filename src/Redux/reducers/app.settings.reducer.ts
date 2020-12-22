import {AppSettingsType} from "../../AppTypes";
import {getFromLocalStorage, setToLocalStorage} from "../rootReducer";

import pepperoniImg from '../../static/images/pizza/pepperoni.jpeg';
import bavariaImg from '../../static/images/pizza/bavaria.jpeg';
import bbqImg from '../../static/images/pizza/bbq.jpeg'
import carbonaraImg from '../../static/images/pizza/carbonara.jpeg'
import dolceVitaImg from '../../static/images/pizza/dolce-vita.jpeg'
import koloradoImg from '../../static/images/pizza/kolorado.jpeg'
import saragosaImg from '../../static/images/pizza/saragosa.jpeg'
import sardiniaImg from '../../static/images/pizza/sardinia.jpeg'

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
            description: 'Простая, как все гениальное, острая пицца с пряной итальянской колбасой пепперони и перцем халапеньо на традиционном тесте',
            price: {
                sum: 13,
                currency: 'usd'
            },
            image: pepperoniImg
        },
        {
            alias: 'Bavaria',
            title: 'Bavaria',
            description: 'Нежный фарш из говядины, ветчина, охотничьи колбаски, пепперони, красный лук и свежие томаты в пикантном соусе Карри-Вурст. Идеальное вкусовое сочетание на традиционном тесте',
            price: {
                sum: 13,
                currency: 'usd'
            },
            image: bavariaImg
        },
        {
            alias: 'bbq',
            title: 'Barbeque',
            description: 'Ароматный бекон, курица, ветчина и сладкий болгарский перец. Неповторимый вкус пицце придает традиционный американский соус барбекю.',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: bbqImg
        },
        {
            alias: 'dolceVita',
            title: 'Dolce Vita',
            description: 'Творожный сыр, сгущенное молоко, ананас, яблоки, малина, черника… Нет, это не праздничный торт, а сладкая пицца на традиционном тесте ',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: dolceVitaImg
        },
        {
            alias: 'colorado',
            title: 'Colorado',
            description: 'Сытная пицца с сочной курицей, грибами, белым соусом тар-тар и ароматным пармезаном.\n',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: koloradoImg
        },
        {
            alias: 'carbonara',
            title: 'Carbonara',
            description: 'Классическая пицца с нежным беконом, моцареллой, пармезаном и свежими помидорами с густым сливочным соусом на традиционном тесте.',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: carbonaraImg
        },
        {
            alias: 'sardinia',
            title: 'Sardinia',
            description: 'Острая smart-пицца с пепперони, говядиной, моцареллой, красным луком и жгучим халапеньо с томатным и сырным соусами на традиционном тесте ',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: sardiniaImg
        },
        {
            alias: 'saragosa',
            title: 'Saragosa',
            description: 'Острая и яркая пицца с испанским акцентом на традиционном тесте в smart-размере 24 см. Аппетитная курочка, нежный бекон, перец халапеньо, красный лук, микс из моцареллы и пармезана в остром соусе согреют в любую погоду.',
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: saragosaImg
        },
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
