import React from "react";
import {Button, Table} from "react-bootstrap";
import {connect} from "react-redux";
import {CurrencyType, LangType, OrderType, PizzaType} from "../../AppTypes";
import './cart.styles.scss'
import {AppCurrencies, covertCurrency, getConvertedPrice} from "../../Utils/app.utils";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {locale} from "../../Utils/app.lang";
import {addPizza} from "../../Redux/actions/order.action";

type CartProps = {
    order: OrderType,
    menu: PizzaType[],
    onAddPizza: (alias: string, count: number) => void,
    currency: CurrencyType,
    lang: LangType,
}

class CartPage extends React.Component<CartProps> {

    renderPriceCell(alias: string) {
        const currentCount = this.props.order[alias];
        return (
            <>
                <ButtonGroup size="sm">
                    <Button
                        variant='danger'
                        style={{
                            marginRight: 10
                        }}
                        onClick={() => this.props.onAddPizza(alias, -1)}
                    >
                        -
                    </Button>
                    {currentCount}
                    <Button
                        variant='success'
                        style={{
                            marginLeft: 10
                        }}
                        onClick={() => this.props.onAddPizza(alias, 1)}
                    >
                        +
                    </Button>
                </ButtonGroup>
            </>
        )
    }

    renderTableRow() {
        const {order, menu} = this.props
        const orderPizzas = Object.keys(order);

        return orderPizzas.map((alias: string) => {
            const pizza: PizzaType = menu.find(x => x.alias == alias);
            const convertedPrice = covertCurrency(pizza.price, this.props.currency)
            if (!order[alias]) return null
            return (
                <tr key={alias}>
                    <td>
                        <img src={pizza.image} alt={pizza.title[this.props.lang]}/>
                    </td>
                    <td>{pizza.title[this.props.lang]}</td>
                    <td>{this.renderPriceCell(alias)}</td>
                    <td>{convertedPrice.sum} {AppCurrencies[convertedPrice.currency]}</td>
                    <td>{convertedPrice.sum * order[alias]} {AppCurrencies[convertedPrice.currency]}</td>
                </tr>
            )
        })
    }

    renderOrderTable() {
        return (
            <Table striped bordered hover className={'cart-table'}>
                <thead>
                    <tr>
                        <th></th>
                        <th>{locale.pizza[this.props.lang]}</th>
                        <th>{locale.count[this.props.lang]}</th>
                        <th>{locale.price[this.props.lang]}</th>
                        <th>{locale.sum[this.props.lang]}</th>
                    </tr>
                </thead>

                <tbody>
                    {this.renderTableRow()}
                </tbody>
            </Table>
        )
    }

    renderEmptyText() {
        return (
            <>
            <h1>{locale.noOrderYet[this.props.lang]}</h1>
                <Link to={'/'}>{locale.goShopPage[this.props.lang]}</Link>
            </>
        )
    }

    renderOrderBlock = () => {
        const sum = Object.keys(this.props.order).reduce((sum, pizza) => {
            const currentPizza = this.props.menu.find(x => x.alias == pizza)
            return sum + (currentPizza.price.sum * this.props.order[pizza])
        }, 0)

        return (
            <>
                {getConvertedPrice({sum, currency: 'usd'}, this.props.currency)}
                <Button variant={'success'}><Link to={'/order'}>{locale.buy[this.props.lang]}</Link></Button>
            </>
        )
    }

    render() {
        return (

            <div className='container'>
                {
                    Object.keys(this.props.order).length
                        ? (
                            <>
                                {this.renderOrderTable()}
                                {this.renderOrderBlock()}
                            </>
                        )
                        : this.renderEmptyText()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currency: state.appSettingReducer.currency,
        lang: state.appSettingReducer.lang,
        menu: state.appSettingReducer.menu,
        order: state.orderReducer.order,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddPizza: (alias: string, count: number) => dispatch(addPizza(alias, count))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
