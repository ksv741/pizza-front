import React from "react";
import {OrderType, PizzaType} from "../../AppTypes";
import {PizzaItem} from "./PizzaItem";
import pepperoniImg from '../../static/images/pizza/pepperonni.png'
import margaritaImg from '../../static/images/pizza/margarita.png'

type MainPageState = {
    menu: PizzaType[],
    order?: OrderType[]
}

export class MainPage extends React.Component<React.Props<any>, MainPageState> {

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
                    alias: 'Margarita',
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

    // TODO
    getPizzaTypeOrder = (pizzaAlias: string): OrderType => {

    }

    renderPizzaItems = (items: PizzaType[]) => {
        return items.map(pizza => {
            return (
                <div className="col-4">
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
