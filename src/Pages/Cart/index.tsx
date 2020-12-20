import React from "react";
import {Button, Table} from "react-bootstrap";
import {connect} from "react-redux";
import {CurrencyType, OrderType, PizzaType} from "../../AppTypes";
import './cart.styles.scss'
import {AppCurrencies, covertCurrency, getConvertedPrice} from "../../Utils/app.utils";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

type CartProps = {
    order: OrderType,
    menu: PizzaType[],
    onAddPizza: (alias: string, count: number) => void,
    currency: CurrencyType,
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
                        <img src={pizza.image} alt={pizza.title}/>
                    </td>
                    <td>{pizza.title}</td>
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
                        <th>Pizza</th>
                        <th>Count</th>
                        <th>Price</th>
                        <th>Sum</th>
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
            <h1>No order yet</h1>
                <Link to={'/'}>You are welcome to our pizza shop</Link>
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
                <Button variant={'success'}><Link to={'/order'}>Buy</Link></Button>
            </>
        )
    }

    render() {
        const orderId = 103231
        return (

            <div className='container'>
                <span> Your order {orderId}</span>
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
        order: state.orderReducer.order,
        menu: state.appSettingReducer.menu,
        currency: state.appSettingReducer.currency
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddPizza: (alias: string, count: number) => dispatch({type: 'ADD_PIZZA', payload: {alias, count}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
