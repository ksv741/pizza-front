export type LangType = 'eng' | 'rus' | 'deu'
export type CurrencyType = 'eur' | 'usd' | 'rub'

export type AppSettingsType = {
    lang: LangType,
    currency: CurrencyType,
    menu: PizzaType[],
    user?: {
        name: string,
        id: string
    },
    isLoading: boolean,
    error: string,
    history: [],
}

export type PizzaType = {
    alias: string,
    title: {
        [key in LangType]: string
    },
    price: PriceType,
    description: {
        [key in LangType]: string
    },
    image: string
}

export type PriceType = {
    sum: number,
    currency: CurrencyType
}

export type PizzaOrderType = {
    [alias: string]: number
}

export type OrderType = {
    order: PizzaOrderType
}

export type BuyerType = {
    name: string,
    email: string,
    address: string,
    paymentMethod: 'cash' | 'card'
}
