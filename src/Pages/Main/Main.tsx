import React from "react";
import {OrderType, PizzaType} from "../../AppTypes";
import PizzaItem from "./PizzaItem";
import './main.scss'
import classNames from "classnames";
import {connect} from "react-redux";
import ToastItem from "./ToastItem";

type MainPageProps = {
    order: OrderType,
    menu: PizzaType[],
    toastEnqueue: string[]
}

class MainPage extends React.Component<MainPageProps, React.ComponentState> {
    renderPizzaItems = (items: PizzaType[]) => {
        return items.map(pizza => {
            return (
                <div
                    className={classNames
                    (
                        "col-sm-4 col-12",
                        'pizza-item'
                    )}
                    key={pizza.alias}
                >
                    <PizzaItem item={pizza}/>
                </div>
            )
        })
    }

    renderToastBlock = () => {
        const currentEnqueue = this.props.toastEnqueue;

        if (!currentEnqueue.length) return null

        return currentEnqueue.map((toast, index) => {
            const pizza = this.props.menu.find(x => x.alias == toast)
            return <ToastItem key={`${pizza.alias}-${index}`} item={pizza}/>
        })
    }

    render() {
        return (
            <div
                className={'container main'}
                style={{
                    position: 'relative'
                }}
            >
                {this.renderToastBlock()}
                <div className="row">
                    {this.renderPizzaItems(this.props.menu)}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        menu: state.appSettingReducer.menu,
        order: state.orderReducer.order,
        toastEnqueue: state.toastReducer.enqueue
    }
}

export default connect(mapStateToProps)(MainPage)
