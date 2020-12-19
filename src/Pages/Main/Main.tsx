import React from "react";
import {OrderType, PizzaType} from "../../AppTypes";
import PizzaItem from "./PizzaItem";
import pepperoniImg from '../../static/images/pizza/pepperoni.jpeg'
import bavariaImg from '../../static/images/pizza/bavaria.jpeg'
import margaritaImg from '../../static/images/pizza/margarita.png'
import './main.scss'
import classNames from "classnames";
import {connect} from "react-redux";

type MainPageState = {
    menu: PizzaType[],
}

type MainPageProps = {
    order: OrderType
}

class MainPage extends React.Component<MainPageProps, MainPageState> {

    constructor(props) {
        super(props);

        // TODO add some pizzas in menu
        this.state = {
            menu: [
                {
                    alias: 'Pepperoni',
                    title: 'Pepperoni',
                    description: 'Super Giper Pepperoni',
                    price: {
                        summ: 13,
                        currency: 'usd'
                    },
                    image: pepperoniImg
                },
                {
                    alias: 'Bavaria',
                    title: 'Bavaria',
                    description: 'Super Giper Bavaria',
                    price: {
                        summ: 13,
                        currency: 'usd'
                    },
                    image: bavariaImg
                },
                {
                    alias: 'Margarita',
                    title: 'Margarita',
                    description: 'Super Giper Margarita',
                    price: {
                        summ: 9,
                        currency: 'eur'
                    },
                    image: margaritaImg
                },
                {
                    alias: 'Margarita2',
                    title: 'Margarita',
                    description: 'Super Giper Margarita',
                    price: {
                        summ: 9,
                        currency: 'eur'
                    },
                    image: margaritaImg
                },
                {
                    alias: 'Margarita3',
                    title: 'Margarita',
                    description: 'Super Giper Margarita',
                    price: {
                        summ: 9,
                        currency: 'eur'
                    },
                    image: margaritaImg
                }
            ]
        }
    }


    renderPizzaItems = (items: PizzaType[]) => {
        return items.map(pizza => {
            return (
                <div
                    className={classNames
                    (
                        "col-4",
                        'pizza-item'
                    )}
                    key={pizza.alias}
                >
                    <PizzaItem item={pizza}/>
                </div>
            )
        })
    }

    render() {
        return (
            <div className={'container'}>
                <div className="row">
                    {this.renderPizzaItems(this.state.menu)}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        order: state.orderReducer.order
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddPizza: (pizza: string) => dispatch({type: 'ADD_PIZZA', payload: pizza})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
