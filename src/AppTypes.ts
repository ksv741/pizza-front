export type LangType = 'eng' | 'rus' | 'deu'
export type CurrencyType = 'eur' | 'usd' | 'rub'

export type AppSettingsType = {
    lang: LangType,
    currency: CurrencyType
}

export type PizzaType = {
    alias: string,
    title: string,
    price: PriceType,
    description: string,
    image: string
}

export type PriceType = {
    summ: number,
    currency: CurrencyType
}

export type PizzaOrderType = {
    [alias: string]: number
}

export type OrderType = {
    order: PizzaOrderType
}
