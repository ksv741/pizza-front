import React from "react";
import {Route, Switch } from "react-router-dom";
import MainPage from "../../Pages/Main/Main";
import {OrderPage} from "../../Pages/Order/Order";
import {ConfirmPage} from "../../Pages/Confirm/iindex";
import CartPage from "../../Pages/Cart";
import {AuthPage} from "../../Pages/Auth";

export class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/order' component={OrderPage}/>
                <Route path='/confirm' component={ConfirmPage}/>
                <Route path='/cart' component={CartPage}/>
                <Route path='/auth/:type' component={AuthPage}/>
                <Route path='/' exact component={MainPage}/>
            </Switch>
        )
    }
}
