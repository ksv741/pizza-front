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
            title: {
                eng: 'Pepperoni',
                rus: 'Пеперони',
                deu: 'Pepperoni'
            },
            description: {
                eng: 'Simple as all ingenious, spicy pizza with spicy Italian sausage pepperoni and jalapeno peppers on a traditional pastry',
                rus: 'Простая, как все гениальное, острая пицца с пряной итальянской колбасой пепперони и перцем халапеньо на традиционном тесте',
                deu: 'Einfach wie jede geniale, würzige Pizza mit würzigen italienischen Wurst-Peperoni und Jalapeno-Pfeffer auf traditionellem Gebäck'
            },
            price: {
                sum: 13,
                currency: 'usd'
            },
            image: pepperoniImg
        },
        {
            alias: 'Bavaria',
            title: {
                eng: 'Bavaria',
                rus: 'Бавария',
                deu: 'Bayern',
            },
            description: {
                eng: 'Delicate ground beef, ham, hunting sausages, pepperoni, red onion and fresh tomatoes in a savory Curry-Wurst sauce. Perfect flavor combination based on traditional dough',
                rus: 'Нежный фарш из говядины, ветчина, охотничьи колбаски, пепперони, красный лук и свежие томаты в пикантном соусе Карри-Вурст. Идеальное вкусовое сочетание на традиционном тесте',
                deu: 'Feines Rinderhackfleisch, Schinken, Jagdwürste, Peperoni, rote Zwiebeln und frische Tomaten in einer herzhaften Curry-Wurst-Sauce. Perfekte Geschmackskombination basierend auf traditionellem Teig'
            },
            price: {
                sum: 13,
                currency: 'usd'
            },
            image: bavariaImg
        },
        {
            alias: 'bbq',
            title: {
                eng: 'Barbeque',
                rus: 'Барбекю',
                deu: 'Grillen',
            },
            description: {
                eng: 'Aromatic bacon, chicken, ham and bell peppers. Traditional American barbecue sauce gives the pizza a unique taste.',
                rus: 'Ароматный бекон, курица, ветчина и сладкий болгарский перец. Неповторимый вкус пицце придает традиционный американский соус барбекю.',
                deu: 'Aromatischer Speck, Huhn, Schinken und Paprika. Die traditionelle amerikanische Barbecue-Sauce verleiht der Pizza einen einzigartigen Geschmack.'
            },
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: bbqImg
        },
        {
            alias: 'dolceVita',
            title: {
                eng: 'Dolce Vita',
                rus: 'Дольче Вита',
                deu: 'Dolce Vita',
            },
            description: {
                eng: 'Curd cheese, condensed milk, pineapple, apples, raspberries, blueberries ... No, this is not a birthday cake, but a sweet pizza on traditional dough',
                rus: 'Творожный сыр, сгущенное молоко, ананас, яблоки, малина, черника… Нет, это не праздничный торт, а сладкая пицца на традиционном тесте ',
                deu: 'Quark, Kondensmilch, Ananas, Äpfel, Himbeeren, Blaubeeren ... Nein, dies ist keine Geburtstagstorte, sondern eine süße Pizza mit traditionellem Gebäck'
            },
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: dolceVitaImg
        },
        {
            alias: 'colorado',
            title: {
                eng: 'Colorado',
                rus: 'Колорадо',
                deu: 'Colorado',
            },
            description: {
                eng: 'Hearty pizza with juicy chicken, mushrooms, white tartar sauce and aromatic parmesan',
                rus: 'Сытная пицца с сочной курицей, грибами, белым соусом тар-тар и ароматным пармезаном.',
                deu: 'Herzhafte Pizza mit saftigem Hühnchen, Pilzen, weißer Tartarsauce und aromatischem Parmesan.'
            },
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: koloradoImg
        },
        {
            alias: 'carbonara',
            title: {
                eng: 'Carbonara',
                rus: 'Карбонара',
                deu: 'Carbonara',
            },
            description: {
                eng: 'Classic pizza with tender bacon, mozzarella, parmesan and fresh tomatoes with thick creamy sauce on traditional pastry',
                rus: 'Классическая пицца с нежным беконом, моцареллой, пармезаном и свежими помидорами с густым сливочным соусом на традиционном тесте.',
                deu: 'Klassische Pizza mit zartem Speck, Mozzarella, Parmesan und frischen Tomaten mit dicker cremiger Sauce auf traditionellem Gebäck'
            },
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: carbonaraImg
        },
        {
            alias: 'sardinia',
            title: {
                eng: 'Sardinia',
                rus: 'Сардиния',
                deu: 'Sardinien',
            },
            description: {
                eng: 'Spicy smart pizza with pepperoni, beef, mozzarella, red onion and hot jalapenos with tomato and cheese sauces on traditional pastry',
                rus: 'Острая smart-пицца с пепперони, говядиной, моцареллой, красным луком и жгучим халапеньо с томатным и сырным соусами на традиционном тесте ',
                deu: 'Würzige Pizza mit Peperoni, Rindfleisch, Mozzarella, roten Zwiebeln und heißen Jalapenos mit Tomaten- und Käsesaucen auf traditionellem Gebäck'
            },
            price: {
                sum: 9,
                currency: 'eur'
            },
            image: sardiniaImg
        },
        {
            alias: 'saragosa',
            title: {
                eng: 'Saragossa',
                rus: 'Сарагоса',
                deu: 'Saragossa',
            },
            description: {
                eng: 'Spicy and bright pizza with a Spanish accent on the traditional dough in a smart size 24 cm. Appetizing chicken, tender bacon, jalapeno peppers, red onions, a mix of mozzarella and parmesan in a spicy sauce will warm you in any weather.',
                rus: 'Острая и яркая пицца с испанским акцентом на традиционном тесте в smart-размере 24 см. Аппетитная курочка, нежный бекон, перец халапеньо, красный лук, микс из моцареллы и пармезана в остром соусе согреют в любую погоду.',
                deu: 'Würzige und helle Pizza mit spanischem Akzent auf dem traditionellen Teig in einer eleganten Größe von 24 cm. Appetitliches Huhn, zarter Speck, Jalapenopfeffer, rote Zwiebeln, eine Mischung aus Mozzarella und Parmesan in einer würzigen Sauce wärmen Sie bei jedem Wetter.'
            },
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
