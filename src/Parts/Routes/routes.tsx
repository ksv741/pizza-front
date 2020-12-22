import React from "react";
import {Redirect, Route, Switch } from "react-router-dom";
import MainPage from "../../Pages/Main/Main";
import OrderPage from "../../Pages/Order/Order";
import HistoryPage from "../../Pages/History";
import CartPage from "../../Pages/Cart";
import AuthPage from "../../Pages/Auth";
import {connect} from "react-redux";
import {OrderType, PizzaOrderType} from "../../AppTypes";

type RoutesProps = {
    isSignedIn: boolean,
    order: PizzaOrderType[]
}

class Routes extends React.Component<RoutesProps> {
    render() {
        const haveOrders = !!Object.keys(this.props.order).length
        return (
            <Switch>
                <Route path='/history' render={() => (
                    this.props.isSignedIn
                        ? <HistoryPage/>
                        : <Redirect to="/"/>
                )}
                />
                <Route path='/order' render={() => (
                    haveOrders
                        ? <OrderPage/>
                        : <Redirect to="/"/>
                    )}
                />
                <Route path='/cart' component={CartPage}/>
                <Route path='/auth' component={AuthPage}/>
                <Route path='/' exact component={MainPage}/>
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        isSignedIn: state.authReducer.isSignedIn,
        order: state.orderReducer.order
    }
}

export default connect(mapStateToProps)(Routes)
