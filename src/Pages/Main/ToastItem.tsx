import React from "react";
import {PizzaType} from "../../AppTypes";
import {Col, Row, Toast} from "react-bootstrap";
import {connect} from "react-redux";

type ToastType = {
    item: PizzaType,
    shown: boolean,
    onClose: (alias: string) => void
}

class ToastItem extends React.Component<ToastType> {
    render() {
        return (
            <Row
                style={{
                    position: 'absolute',
                    top: 0,
                    right: -220,
                    zIndex: 2,
                    width: 510
                }}
            >
                <Col xs={6}>
                    <Toast
                        show={this.props.shown}
                        onClose={() => this.props.onClose(this.props.item.alias)}
                    >
                        <Toast.Header>
                            <strong className="mr-auto">Bootstrap</strong>
                        </Toast.Header>
                        <Toast.Body>You add {this.props.item.title} pizza to cart</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        shown: state.shown
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClose: (alias) => {dispatch({type: 'REMOVE_TOAST_FROM_ENQUEUE', payload: alias})},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastItem)
