import {OrderType} from "../../AppTypes";
import {getFromLocalStorage, setToLocalStorage} from "../rootReducer";

const initialState: OrderType = {
    order: getFromLocalStorage('currentOrder')
}

export default function orderReducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_PIZZA':
            const order = {
                ...state.order,
                [action.payload.alias]: state.order[action.payload.alias] ? state.order[action.payload.alias] + action.payload.count : 1
            }
            const newState = {
                ...state,
                order
            }

            setToLocalStorage('currentOrder', order)

           return newState
    }

    return state
}





