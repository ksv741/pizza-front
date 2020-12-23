import React from "react";
import {connect} from "react-redux";
import {getHistory} from "../../Redux/actions/order.action";
import {Spinner, Table} from "react-bootstrap";
import {CurrencyType, LangType, PizzaType} from "../../AppTypes";
import {getConvertedPrice} from "../../Utils/app.utils";
import {locale} from "../../Utils/app.lang";

type HistoryPageType = {
    getHistory: () => void,
    history: any[],
    menu: PizzaType[],
    isLoading: boolean,
    currency: CurrencyType,
    lang: LangType,
}

class HistoryPage extends React.Component<HistoryPageType> {

    componentDidMount() {
        this.props.getHistory()
    }

    calculateSum = (item) => {
       const sumCount = item.order.reduce((sum, current) => {
           const findPizza = this.props.menu.find(x => x.alias == current.alias)
           if (!findPizza) return sum

           return sum + findPizza.price.sum
       }, 0)

        return getConvertedPrice({sum: sumCount, currency: 'usd'}, this.props.currency)
    }

    renderOrders = () => {
        const {history} = this.props

        return history.map((item, index) => {
            const pizzas = item.order.map(order => {
                const findPizza = this.props.menu.find(x => x.alias == order.alias)

                if (!findPizza) return null

                return (
                    <div key={order.alias}>
                        <strong>{order.alias}</strong>
                        :
                        <span>{order.count}</span>
                        <hr/>
                    </div>
                )
            })
            return (
                <tr key={item.time}>
                    <td>{index + 1}</td>
                    <td>{pizzas}</td>
                    <td>
                        {new Date(item.time).toLocaleDateString()}
                        &nbsp;
                        {new Date(item.time).toLocaleTimeString()}
                    </td>
                    <td>{item.address}</td>
                    <td>{this.calculateSum(item)}</td>
                    <td>{item.paymentMethod}</td>
                </tr>
            )
        })
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className={'container'}>
                    <Spinner animation="border" variant="warning" />
                </div>
            )
        }

        if (!this.props.history) {
            return (
                <div className={'container'}>
                    <h1>{locale.noHistory[this.props.lang]}</h1>
                </div>
            )
        }

        return (
            <div className={'container'}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>{locale.history[this.props.lang]}</th>
                        <th>{locale.time[this.props.lang]}</th>
                        <th>{locale.address[this.props.lang]}</th>
                        <th>{locale.sum[this.props.lang]}</th>
                        <th>{locale.paymentMethod[this.props.lang]}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderOrders()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currency: state.appSettingReducer.currency,
        history: state.appSettingReducer.history,
        isLoading: state.appSettingReducer.isLoading,
        lang: state.appSettingReducer.lang,
        menu: state.appSettingReducer.menu,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHistory: () => dispatch(getHistory()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)
