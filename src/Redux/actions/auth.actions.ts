import {LOG_IN, SIGN_IN, SIGN_OUT, SIGN_UP} from "./actionTypes";
import {clearErrors, setError, setLoading} from "./appSettings.actions";

export function signUp (email: string, password: string, name: string) {

    return async dispatch => {
        dispatch(clearErrors)

        const data = await request('http://localhost:5000/api/auth/signup', 'POST', {email, password, name})
        console.log('Data sign up', data);
        if (!data.error) dispatch(successSignUp(email, name))
        else dispatch(setError(data.error))
    }

}

export function signIn (email: string, password: string) {
    return async dispatch => {
        dispatch(clearErrors())

        const data = await request('http://localhost:5000/api/auth/signin', 'POST', {email, password})
        console.log('Data sign in', data);
        if (!data.error) dispatch(successSignIn(email, data.name, data.token, data.userId))
        else {
            console.log('DATA', data)
            dispatch(setError(data.error))
        }
    }
}

export function signOut () {
    return {
        type: SIGN_OUT
    }
}

export function isSignedIn (user) {
    console.log('Is sign in user ?', user)
    return async dispatch => {
        const data = await request('http://localhost:5000/api/auth/isSignIn', 'POST', {token: `${user.token}`, userId: user.userId})
        console.log('fata', data)
        if (!data.error) {
            const {user} = data
            dispatch(logIn(user.email, user.name))
        }
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

function logIn (email: string, name: string) {
    return {
        type: LOG_IN,
        payload: { name, email }
    }
}

async function request(url: string, method: string = 'GET', body = null, headers = {}) {
    setLoading(true)

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

        setLoading(false)

        return data
    } catch(e) {
        setLoading(false)

        return {error: e.message};
        // setError
    }
}


