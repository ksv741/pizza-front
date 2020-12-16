import React from "react";
import {Button, Card} from "react-bootstrap";
import {PizzaType} from "../../AppTypes";
import {AppCurrencies} from "../../Utils/app.utils";

type PizzaItemProps = {
    item: PizzaType
}

export class PizzaItem extends React.Component<PizzaItemProps, any> {

    // TODO get price in right currency
    getPrice = (): number => {
        return 0
    }

    render() {
        const {item} = this.props
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="success">{item.price.summ}{AppCurrencies[item.price.currency]}</Button>
                    <Button variant="primary">Add to cart</Button>
                </Card.Body>
            </Card>
        )
    }
}
