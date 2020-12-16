export type LangType = 'eng' | 'rus' | 'deu'
export type CurrencyType = 'eur' | 'usd' | 'rub'

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

export type OrderType = {
    pizza: PizzaType,
    count: number
}
