import React from "react";
import {Route, Switch } from "react-router-dom";
import MainPage from "../../Pages/Main/Main";
import OrderPage from "../../Pages/Order/Order";
import HistoryPage from "../../Pages/History";
import CartPage from "../../Pages/Cart";
import AuthPage from "../../Pages/Auth";
import {connect} from "react-redux";

type RoutesProps = {
    isSignedIn: boolean
}

class Routes extends React.Component<RoutesProps> {
    render() {
        return (
            <Switch>
                <Route path='/order' component={OrderPage}/>
                {this.props.isSignedIn && <Route path='/history' component={HistoryPage}/>}
                <Route path='/cart' component={CartPage}/>
                <Route path='/auth' component={AuthPage}/>
                <Route path='/' exact component={MainPage}/>
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        isSignedIn: state.authReducer.isSignedIn
    }
}

export default connect(mapStateToProps)(Routes)
