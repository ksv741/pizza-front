import React from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {clearOrder, makeOrder} from "../../Redux/actions/order.action";
import {connect} from "react-redux";
import {BuyerType, OrderType} from "../../AppTypes";

type OrderPageProps = {
    name: string,
    email: string,
    order: OrderType,
    makeOrder: (order: OrderType, buyer: BuyerType) => void
}

class OrderPage extends React.Component<OrderPageProps> {

    submitOrderHandler = async (e: React.FormEvent) => {
        e.preventDefault()

        const buyer: BuyerType = {
            name: e.target[0].value,
            email: e.target[1].value,
            address: e.target[2].value,
            paymentMethod: e.target[3].checked ? 'card' : 'cash'
        }
        const result = await this.props.makeOrder(this.props.order, buyer)

        console.log('Result', result)
    }

    render() {
        console.log('ORDER', this.props.name, this.props.email)
        return (
            <div className='container'>
                <Form onSubmit={this.submitOrderHandler}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            defaultValue={this.props.name}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGroupName">
                        <Form.Label>Your email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            defaultValue={this.props.email}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter the address" />
                    </Form.Group>

                    <InputGroup>
                        <InputGroup.Checkbox/>
                        <span>Pay by card</span>
                    </InputGroup>

                    <Button
                        variant='success'
                        type='submit'
                    >
                        Submit
                    </Button>

                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.authReducer.name,
        email: state.authReducer.email,
        order: state.orderReducer.order
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeOrder: (order, buyer) => dispatch(makeOrder(order, buyer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
