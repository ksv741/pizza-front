import {combineReducers} from "redux";
import appSettingReducer from "./reducers/app.settings.reducer";
import orderReducer from "./reducers/order.reducer";
import toastReducer from "./reducers/toast.reducer";
import authReducer from "./reducers/auth.reducer";

export default combineReducers({
    appSettingReducer,
    orderReducer,
    toastReducer,
    authReducer
})

export function getFromLocalStorage(field: string) {
    return JSON.parse(localStorage.getItem(field))
}
export function setToLocalStorage(field: string, value) {
    return localStorage.setItem(field, JSON.stringify(value))
}
