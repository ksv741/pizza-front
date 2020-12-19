import React from "react";
import {Badge, Button, Card} from "react-bootstrap";
import {PizzaOrderType, PizzaType} from "../../AppTypes";
import {AppCurrencies} from "../../Utils/app.utils";
import {connect} from "react-redux";

type PizzaItemProps = {
    item: PizzaType,
    onAddPizza: (alias: string, count: number) => void,
    order: PizzaOrderType,
}

class PizzaItem extends React.Component<PizzaItemProps, any> {

    renderPriceBlock() {
        const {item} = this.props

        const renderCount = !this.props.order[item.alias]
            ? null
            : <Badge
                variant="light"
                style={{
                    marginLeft: 5
                }}
            >
                {this.props.order[item.alias]}
        </Badge>

        const renderRemoveButton = this.props.order[item.alias]
            ? (
                <Button
                    variant="danger"
                    onClick={() => this.props.onAddPizza(item.alias, -1)}
                >
                    &#10008;
                </Button>
            )
            : null

        return (
            <div
                className='price-block'
            >
                <Button
                    variant="success"
                    style={{
                        marginRight: 10
                    }}
                >
                    {item.price.summ}
                    {AppCurrencies[item.price.currency]}
                </Button>

                <Button
                    variant="primary"
                    onClick={() => this.props.onAddPizza(item.alias, 1)}
                >
                    Add to cart
                    {renderCount}
                </Button>

                {renderRemoveButton}
            </div>
        )
    }

    render() {
        const {item} = this.props
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    {this.renderPriceBlock()}
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        order: state.orderReducer.order
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddPizza: (alias: string, count: number) => dispatch({type: 'ADD_PIZZA', payload: {alias, count}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaItem)
