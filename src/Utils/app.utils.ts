import {CurrencyType, PriceType} from "../AppTypes";

export enum AppLanguages {
    deu = 'Deutsch',
    eng = 'English',
    rus = 'Russian'
}

export enum AppCurrencies  {
    eur = '€',
    rub = '₽',
    usd = '$'
}

// TODO Choose the one(!) general relative currency, and return converted price
// export const covertCurrency = (from: PriceType, to: CurrencyType): PriceType {}
