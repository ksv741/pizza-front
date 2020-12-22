import {CLEAR_USER, LOG_IN, SIGN_IN, SIGN_OUT, SIGN_UP} from "./actionTypes";
import {clearErrors, setError, setLoading} from "./appSettings.actions";
import {request} from "../../Utils/app.utils";

export function signUp (email: string, password: string, name: string) {
    return async dispatch => {
        dispatch(clearErrors)
        dispatch(setLoading(true))

        const data = await request('/api/auth/signup', 'POST', {email, password, name})

        dispatch(setLoading(false))

        // TODO after success signing Up dispatch sign IN
        if (!data.error) dispatch(successSignUp(email, name))
        else dispatch(setError(data.error))
    }
}

export function signIn (email: string, password: string) {
    return async dispatch => {

        dispatch(clearErrors())
        dispatch(setLoading(true))

        const data = await request('/api/auth/signin', 'POST', {email, password})

        dispatch(setLoading(false))

        if (!data.error) dispatch(successSignIn(email, data.name, data.token, data.userId))
        else dispatch(setError(data.error))
    }
}

export function signOut () {
    return {
        type: SIGN_OUT
    }
}

export function logIn (user) {
    return async dispatch => {
        dispatch(clearErrors())
        dispatch(setLoading(true))

        const data = await request('/api/auth/login', 'POST', null, {
            'Authorization': `Bearer ${user.token}`
        })

        dispatch(setLoading(false))

        if (!data.error) {
            const {user} = data
            dispatch(successLogIn(user.email, user.name))
        } else clearUser()

    }
}

function clearUser () {
    return {
        type: CLEAR_USER
    }
}

function successSignUp (email: string, name: string){
    return {
        type: SIGN_UP,
        payload: {email, name}
    }
}

function successSignIn (email: string, name: string, token: string, userId: string){
    return {
        type: SIGN_IN,
        payload: {email, name, token, userId}
    }
}

function successLogIn (email: string, name: string) {
    return {
        type: LOG_IN,
        payload: { name, email }
    }
}
