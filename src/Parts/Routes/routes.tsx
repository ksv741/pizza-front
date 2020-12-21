import React from "react";
import {Route, Switch } from "react-router-dom";
import MainPage from "../../Pages/Main/Main";
import OrderPage from "../../Pages/Order/Order";
import HistoryPage from "../../Pages/History";
import CartPage from "../../Pages/Cart";
import AuthPage from "../../Pages/Auth";

export class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/order' component={OrderPage}/>
                <Route path='/history' component={HistoryPage}/>
                <Route path='/cart' component={CartPage}/>
                <Route path='/auth' component={AuthPage}/>
                <Route path='/' exact component={MainPage}/>
            </Switch>
        )
    }
}
