import React from "react";
import {Navbar, DropdownButton, Dropdown, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import {CurrencyType, LangType, OrderType} from "../../AppTypes";
import {AppCurrencies, AppLanguages} from "../../Utils/app.utils";

interface HeaderProps {
    lang: LangType,
    onChangeLang: (lang: LangType) => void,
    currency: CurrencyType,
    onChangeCurrency: (cur: CurrencyType) => void,
    order: OrderType[]
}

// TODO add styles !!!
export class Header extends React.Component<HeaderProps> {

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
                onClick={this.props.onChangeLang.bind(this, lang)}
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
                onClick={this.props.onChangeCurrency.bind(this, cur)}
            >
                {AppCurrencies[cur]}
            </Dropdown.Item>
        ))
    }

    getPizzaOrderCount = ():number => {
        if (!this.props.order.length) return null

        return this.props.order.reduce((allCount, pizza) => {
            return allCount + pizza.count
        }, 0)
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

                <div>
                    Cart {this.getPizzaOrderCount()}
                </div>

            </Navbar>
        )
    }

}
