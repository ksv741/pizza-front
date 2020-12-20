import React from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {clearOrder} from "../../Redux/actions/order.action";
import {connect} from "react-redux";

type OrderPageProps = {
    name: string,
    email: string
}

class OrderPage extends React.Component<OrderPageProps> {
    render() {
        console.log('ORDER', this.props.name, this.props.email)
        return (
            <div className='container'>
                <Form>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control
                            type="text"
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

                    <Button variant='success' type='submit'>
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
        email: state.authReducer.email
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearOrder: () => dispatch(clearOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
