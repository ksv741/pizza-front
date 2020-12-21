import {LOG_IN, SIGN_IN, SIGN_OUT, SIGN_UP} from "../actions/actionTypes";
import {setToLocalStorage} from "../rootReducer";

const initialState = {
    email: null,
    name: null,
    error: null,
    isLoading: false,
    isTokenActive: false,
    token: null,
    isSignedIn: false
}

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case SIGN_UP:
            return {...state, name: action.payload.name, email: action.payload.email}

        case SIGN_IN:
            setToLocalStorage('user', JSON.stringify({token: action.payload.token, userId: action.payload.userId}));

            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
                isTokenActive: true,
                userId: action.payload.userId,
                isSignedIn: true
            }

        case SIGN_OUT: {
            localStorage.removeItem('user')
            return {
                initialState
            }
        }

        case LOG_IN: {
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                isSignedIn: true
            }
        }
    }

    return state
}
