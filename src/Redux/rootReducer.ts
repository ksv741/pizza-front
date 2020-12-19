import {combineReducers} from "redux";
import appSettingReducer from "./reducers/app.settings";
import orderReducer from "./reducers/order.reducer";

export default combineReducers({
    appSettingReducer,
    orderReducer
})

export function getFromLocalStorage(field: string) {
    return JSON.parse(localStorage.getItem(field))
}
export function setToLocalStorage(field: string, value) {
    return localStorage.setItem(field, JSON.stringify(value))
}
