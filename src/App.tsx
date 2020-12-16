import React from "react";
import {Header} from "./Parts/Header";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./Parts/Routes/routes";
import {CurrencyType, LangType, OrderType} from "./AppTypes";

type AppState = {
    lang: LangType;
    currency: CurrencyType;
    order?: OrderType[]
}

export class App extends React.Component<React.ComponentProps<any>, AppState> {

    constructor(props) {
        super(props);

        // Initial app state
        this.state = {
            lang: 'rus',
            currency: 'rub',
            order: []
        }
    }

    changeLang = (lang: LangType) => {
        this.setState({lang})
    }

    changeCurrency = (currency: CurrencyType) => {
        this.setState({currency})
    }

    render() {
        return(
            <BrowserRouter>
                <Header
                    lang={this.state.lang}
                    currency={this.state.currency}
                    onChangeLang={this.changeLang}
                    onChangeCurrency={this.changeCurrency}
                    order={this.state.order}
                 />
                <Routes/>
            </BrowserRouter>
        )
    }
}
