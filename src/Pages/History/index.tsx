import React from "react";
import {connect} from "react-redux";
import {getHistory} from "../../Redux/actions/order.action";
import {Table} from "react-bootstrap";
import {PizzaType} from "../../AppTypes";

type HistoryPageType = {
    getHistory: () => void,
    history: any[],
    menu: PizzaType[]
}

class HistoryPage extends React.Component<HistoryPageType> {

    componentDidMount() {
        this.props.getHistory()
    }

    renderOrders = () => {
        const {history} = this.props

        return history.map((item, index) => {
            const pizzas = item.order.map(order => {
                const findPizza = this.props.menu.find(x => x.alias == order.alias)
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
                    <td>{item.paymentMethod}</td>
                </tr>
            )
        })
    }

    render() {

        if (!this.props.history) {
            return (
                <h1>No history</h1>
            )
        }

        return (
            <div className={'container'}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Order</th>
                        <th>Time</th>
                        <th>Address</th>
                        <th>Payment Method</th>
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
        history: state.appSettingReducer.history,
        menu: state.appSettingReducer.menu
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHistory: () => dispatch(getHistory()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)
