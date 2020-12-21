import {CurrencyType, PriceType} from "../AppTypes";
import {setLoading} from "../Redux/actions/appSettings.actions";

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

export async function request(url: string, method: string = 'GET', body = null, headers = {}) {
    try{
        if (body) {
            body = JSON.stringify(body)
            headers['Content-type'] = 'application/json'
        }
        const response = await fetch(url, {method, body, headers})
        console.log('response', response)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Something goes wrong')
        }

        return data
    } catch(e) {
        return {error: e.message};
    }
}
