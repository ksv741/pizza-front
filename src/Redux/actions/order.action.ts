import {CLEAR_ORDER, GET_HISTORY, MAKE_ORDER} from "./actionTypes";
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

        const data = await request('http://localhost:5000/api/order/make', 'POST', {order: normalizeOrder, ...buyer})

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

        const data = await request('http://localhost:5000/api/history/', 'GET', null, headers)

        dispatch(setLoading(false))

        if (!data.error) dispatch(history(data.orders))
        else dispatch(setError(data.error))
    }
}

function history(history) {
    return {
        type: GET_HISTORY,
        payload: history
    }
}

// type: MAKE_ORDER,
// payload: {order, buyer}
