import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {AppCurrencies, AppLanguages, FlagByLang} from "../../Utils/app.utils";
import {CurrencyType, LangType, OrderType} from "../../AppTypes";
import {Navbar, DropdownButton, Dropdown, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {signOut} from "../../Redux/actions/auth.actions";
import {locale} from "../../Utils/app.lang";
import {changeCurrency, changeLang} from "../../Redux/actions/appSettings.actions";
import './header.scss'

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

class Header extends React.Component<HeaderProps> {

    constructor(props) {
        super(props);
    }

    renderAllLanguagesFields = () => {
        const all = Object.keys(AppLanguages)

        return all.map((lang: LangType) => (
            <Dropdown.Item
                key={lang}
                as="button"
                active={this.props.lang == lang}
                onClick={() => this.props.onChangeLang(lang)}
                className={'header-flag-dropdown__item'}
            >
                {AppLanguages[lang]} {renderFlagByCountryTag(FlagByLang[lang])}
            </Dropdown.Item>
        ))
    }

    renderAllCurrenciesFields = () => {
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

    renderPizzaOrderCount = ():number => {

        if (!Object.values(this.props.order).length) return 0

        const ordersCount =  Object.values(this.props.order).reduce((allCount, currentCount) => {
            // TODO fix
            // @ts-ignore
            return allCount + currentCount
        }, 0)

        if (ordersCount) return ordersCount
        else return 0
    }

    renderAuthBlock = () => {
        if (!this.props.isSignedIn) {
            return <Link to={'/auth'}><Button variant='info'>{locale.auth[this.props.lang]}</Button></Link>
        }

        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.props.userName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Link to={'/history'}><Dropdown.Item as='button'>{locale.history[this.props.lang]}</Dropdown.Item></Link>

                    <Dropdown.Item
                        as="button"
                        onClick={() => {
                            this.props.onLogOut()
                            this.props.history.push('/')
                        }}
                    >
                        {locale.logout[this.props.lang]}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    render() {
        return (

            <Navbar
                bg="dark"
                expand="lg"
                sticky="top"
                className={'header'}
                variant="dark"
            >
                <div
                    className={'container'}
                >
                        <Link to='/' className={'header-link__home'}>Pizza Shop</Link>

                        <div style={{display: 'flex'}}>
                            <div className={'header-personal-settings'}>
                                <DropdownButton id="dropdown-item-button" title={AppLanguages[this.props.lang]} variant='light'>
                                    {this.renderAllLanguagesFields()}
                                </DropdownButton>

                                <DropdownButton
                                    id="dropdown-item-button"
                                    title={AppCurrencies[this.props.currency]}
                                    variant='light'
                                    className={'header-personal-currency'}
                                >
                                    {this.renderAllCurrenciesFields()}
                                </DropdownButton>
                            </div>

                            <div className={'header-personal-btn'}>
                                { this.renderAuthBlock() }

                                <Link to={'/cart'}>
                                    <Button
                                        variant='secondary'
                                        className={'header-personal-cart'}
                                    >
                                        {locale.cart[this.props.lang]} ({this.renderPizzaOrderCount()})
                                    </Button>
                                </Link>
                            </div>
                        </div>

                </div>
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


export function renderFlagByCountryTag(tag: string) {
    return (
        <span className={`flag-icon flag-icon-${tag}`}></span>
    )
}
