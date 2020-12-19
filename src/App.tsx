import React from "react";
import Header from "./Parts/Header";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./Parts/Routes/routes";
// import {CurrencyType, LangType, OrderType} from "./AppTypes";
// import {connect} from "react-redux";


export default class App extends React.Component<React.ComponentProps<any>, React.ComponentState> {

    render() {
        return(
            <BrowserRouter>
                <Header/>
                <Routes/>
            </BrowserRouter>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         lang: state.lang,
//         currency: state.currency
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         onChangeLang: (lang: LangType) => dispatch({type: 'CHANGE_LANG', lang}),
//         onChangeCurrency: (currency: CurrencyType) => dispatch({type: 'CHANGE_CURRENCY', currency})
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App)

