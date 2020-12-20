import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {applyMiddleware, createStore} from 'redux'
import rootReducer from "./Redux/rootReducer";
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(
    reduxThunk
))

const app = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

ReactDOM.render(
    app(),
    document.getElementById("root")
)
