import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {AppCurrencies, AppLanguages} from "../../Utils/app.utils";
import {CurrencyType, LangType, OrderType} from "../../AppTypes";
import {Navbar, DropdownButton, Dropdown, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {signOut} from "../../Redux/actions/auth.actions";
import {locale} from "../../Utils/app.lang";
import {CHANGE_CURRENCY, CHANGE_LANG} from "../../Redux/actions/actionTypes";
import {changeCurrency, changeLang} from "../../Redux/actions/appSettings.actions";


type HeaderProps = {
    lang: LangType,
    onChangeLang: (lang: LangType) => void,
    currency: CurrencyType,
    onChangeCurrency: (cur: CurrencyType) => void,
    order: OrderType,
    userName: string,
    isSignedIn: boolean,
    onLogOut: () => void,
    getHistory: () => void
} & RouteComponentProps

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

        if (!Object.values(this.props.order).length) return 0

        const ordersCount =  Object.values(this.props.order).reduce((allCount, currentCount) => {
            // TODO fix
            // @ts-ignore
            return allCount + currentCount
        }, 0)

        if (ordersCount) return ordersCount
        else return 0
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

                <Link to={'/cart'}><Button variant='secondary'>{locale.cart[this.props.lang]} ({this.getPizzaOrderCount()})</Button></Link>

                {
                    this.props.isSignedIn
                        ? (
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {this.props.userName}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            as="button"
                                            onClick={() => {
                                                this.props.onLogOut()
                                                this.props.history.push('/')
                                            }}
                                        >
                                            {locale.logout[this.props.lang]}
                                        </Dropdown.Item>
                                     <Link to={'/history'}><Dropdown.Item as='button'>{locale.history[this.props.lang]}</Dropdown.Item></Link>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )
                        : <Link to={'/auth'}><Button variant='info'>{locale.auth[this.props.lang]}</Button></Link>
                }

            </Navbar>
        )
    }

}

function mapStateToProps(state) {
    const {appSettingReducer, orderReducer} = state

    return {
        currency: appSettingReducer.currency,
        isSignedIn: state.authReducer.isSignedIn,
        lang: appSettingReducer.lang,
        order: orderReducer.order,
        userName: state.authReducer.name,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeCurrency: (currency: CurrencyType) => dispatch(changeCurrency(currency)),
        onChangeLang: (lang: LangType) => dispatch(changeLang(lang)),
        onLogOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
