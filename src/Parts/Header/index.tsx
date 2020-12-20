import React from "react";
import { Link } from "react-router-dom";
import {AppCurrencies, AppLanguages} from "../../Utils/app.utils";
import {CurrencyType, LangType, OrderType} from "../../AppTypes";
import {Navbar, DropdownButton, Dropdown, Button} from "react-bootstrap";
import {connect} from "react-redux";
import CartPage from "../../Pages/Cart";

interface HeaderProps {
    lang: LangType,
    onChangeLang: (lang: LangType) => void,
    currency: CurrencyType,
    onChangeCurrency: (cur: CurrencyType) => void,
    order: OrderType
}

// TODO add styles !!!
class Header extends React.Component<HeaderProps> {

    constructor(props) {
        super(props);
    }

    getAllLanguagesFields = () => {
        const all = Object.keys(AppLanguages)

        return all.map((lang: LangType) => (
            <Dropdown.Item
                key={lang}
                as="button"
                active={this.props.lang == lang}
                onClick={() => this.props.onChangeLang(lang)}
            >
                {AppLanguages[lang]}
            </Dropdown.Item>
        ))
    }

    getAllCurrenciesFields = () => {
        const all = Object.keys(AppCurrencies)

        return all.map((cur: CurrencyType, i) => (
            <Dropdown.Item
                key={cur}
                as="button"
                active={this.props.currency == cur}
                onClick={() => this.props.onChangeCurrency(cur)}
            >
                {AppCurrencies[cur]}
            </Dropdown.Item>
        ))
    }

    getPizzaOrderCount = ():number => {
        return 5

        if (!Object.values(this.props.order).length) return null

        const ordersCount =  Object.values(this.props.order).reduce((allCount, currentCount) => {
            // TODO fix
            return allCount + currentCount
        }, 0)

        if (ordersCount) return ordersCount
        else return null
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Link to='/'>Pizza Shop</Link>

                <DropdownButton id="dropdown-item-button" title={AppLanguages[this.props.lang]}>
                    {this.getAllLanguagesFields()}
                </DropdownButton>

                <DropdownButton id="dropdown-item-button" title={AppCurrencies[this.props.currency]}>
                    {this.getAllCurrenciesFields()}
                </DropdownButton>

                <Button variant="secondary">Sign</Button>

                <Link
                    to={'/cart'}
                >
                    Cart
                    {this.getPizzaOrderCount()}
                </Link>

            </Navbar>
        )
    }

}

function mapStateToProps(state) {
    const {appSettingReducer, orderReducer} = state

    return {
        lang: appSettingReducer.lang,
        currency: appSettingReducer.currency,
        order: orderReducer.order
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeLang: (lang: LangType) => dispatch({type: 'CHANGE_LANG', lang}),
        onChangeCurrency: (currency: CurrencyType) => dispatch({type: 'CHANGE_CURRENCY', currency})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
