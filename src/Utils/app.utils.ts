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

export const covertCurrency = (from: PriceType, to: CurrencyType): PriceType => {
    // TODO HARDCORE 20.12.2020 !!! Get currency value from API
    const relativeRubToUsd = 1/73;
    const relativeEurToUsd = 1/0.82;

    switch (to) {
        case 'rub': {
            return {
                currency: to,
                sum: from.sum / relativeRubToUsd
            }
        }

        case 'eur': {
            return {
                currency: to,
                sum: from.sum / relativeEurToUsd
            }
        }
    }

    return from
}

export const getConvertedPrice = (from: PriceType, to: CurrencyType): string => {
    const converted = covertCurrency(from, to);
    return `${converted.sum.toFixed()} ${AppCurrencies[converted.currency]}`
}
