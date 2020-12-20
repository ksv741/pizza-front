import {OrderType} from "../../AppTypes";
import {getFromLocalStorage, setToLocalStorage} from "../rootReducer";
import {CLEAR_ORDER} from "../actions/actionTypes";

const initialState: OrderType = {
    order: getFromLocalStorage('currentOrder') || {}
}

export default function orderReducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_PIZZA':
            const order = {
                ...state.order,
                [action.payload.alias]: state.order[action.payload.alias] ? state.order[action.payload.alias] + action.payload.count : 1
            }
            if (!order[action.payload.alias]) delete order[action.payload.alias]

            const newState = {
                ...state,
                order
            }

            setToLocalStorage('currentOrder', order)

           return newState

        case CLEAR_ORDER:
            setToLocalStorage('currentOrder', {})
            return {...state, order: {}}
    }

    return state
}





