import React from "react";
import {Header} from "./Parts/Header";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./Parts/Routes/routes";

type AppState = {
    lang: 'eng' | 'rus' | 'deu'
    currency: 'eur' | 'rub' | 'usd'
}

export class App extends React.Component {

    render() {
        return(
            <BrowserRouter>
                <Header/>
                <Routes/>
            </BrowserRouter>
        )
    }
}
