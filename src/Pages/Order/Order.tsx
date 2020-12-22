import React from "react";
import {Alert, Button, Form, InputGroup, Spinner} from "react-bootstrap";
import {makeOrder} from "../../Redux/actions/order.action";
import {connect} from "react-redux";
import {BuyerType, LangType, OrderType} from "../../AppTypes";
import {RouteComponentProps} from "react-router-dom";
import {clearErrors} from "../../Redux/actions/appSettings.actions";
import {locale} from "../../Utils/app.lang";

type OrderPageProps = {
    name?: string,
    email?: string,
    order?: OrderType,
    makeOrder?: (order: OrderType, buyer: BuyerType) => void,
    isLoading?: boolean,
    error?: string,
    lang?: LangType
}  & RouteComponentProps

class OrderPage extends React.Component<OrderPageProps> {

    submitOrderHandler = async (e: React.FormEvent) => {
        e.preventDefault()

        const buyer: BuyerType = {
            name: e.target[0].value,
            email: e.target[1].value,
            address: e.target[2].value,
            paymentMethod: e.target[3].checked ? 'card' : 'cash'
        }
        await this.props.makeOrder(this.props.order, buyer)
        if (!this.props.error) this.props.history.push('/')
    }

    renderAlertBlock = () => {
        if (this.props.error) {
            return (
                <Alert variant='danger'>
                    {this.props.error}
                </Alert>
            )
        }
        return null
    }

    render() {
        return (
            <div className='container'>
                {this.renderAlertBlock()}
                <Form onSubmit={this.submitOrderHandler}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>{locale.name[this.props.lang]}</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            defaultValue={this.props.name}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGroupName">
                        <Form.Label>{locale.email[this.props.lang]}</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            defaultValue={this.props.email}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>{locale.address[this.props.lang]}</Form.Label>
                        <Form.Control type="text" placeholder="Enter the address" />
                    </Form.Group>

                    <InputGroup>
                        <InputGroup.Checkbox/>
                        <span>{locale.payByCard[this.props.lang]}</span>
                    </InputGroup>

                    {
                        this.props.isLoading
                            ? <Spinner animation="border" variant="warning" />
                            : (
                                <Button variant='success' type='submit'>
                                    {locale.submit[this.props.lang]}
                                </Button>
                            )
                    }

                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.authReducer.email,
        error: state.appSettingReducer.error,
        isLoading: state.appSettingReducer.isLoading,
        lang: state.appSettingReducer.lang,
        name: state.authReducer.name,
        order: state.orderReducer.order,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeOrder: (order, buyer) => dispatch(makeOrder(order, buyer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
