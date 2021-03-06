import {ADD_PIZZA, CLEAR_ORDER, GET_HISTORY} from "./actionTypes";
import {BuyerType, OrderType} from "../../AppTypes";
import {request} from "../../Utils/app.utils";
import {getFromLocalStorage} from "../rootReducer";
import {clearErrors, setError, setLoading} from "./appSettings.actions";

export function makeOrder(order: OrderType, buyer: BuyerType) {
    return async dispatch => {
        const normalizeOrder = Object.keys(order).map(x => {
            return {alias: x, count: order[x]}
        })

        dispatch(clearErrors)
        dispatch(setLoading(true))

        const data = await request('/api/order/make', 'POST', {order: normalizeOrder, ...buyer})

        dispatch(setLoading(false))

        if (!data.error) dispatch(clearOrder())
        else dispatch(setError(data.error))
    }
}

export function clearOrder() {
    return {
        type: CLEAR_ORDER
    }
}

export function getHistory() {
    return async dispatch => {
        const token = JSON.parse(getFromLocalStorage('user')).token
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        dispatch(clearErrors)
        dispatch(setLoading(true))

        const data = await request('/api/history/', 'GET', null, headers)

        dispatch(setLoading(false))

        if (!data.error) dispatch(history(data.orders))
        else dispatch(setError(data.error))
    }
}

export function addPizza(alias: string, count: number) {
    return {type: ADD_PIZZA, payload: {alias, count}}
}

function history(history) {
    return {
        type: GET_HISTORY,
        payload: history
    }
}
