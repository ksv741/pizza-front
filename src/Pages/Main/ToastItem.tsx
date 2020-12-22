import React from "react";
import {LangType, PizzaType} from "../../AppTypes";
import {Col, Row, Toast} from "react-bootstrap";
import {connect} from "react-redux";
import {locale} from "../../Utils/app.lang";
import {removeToast} from "../../Redux/actions/toast.actions";

type ToastType = {
    item: PizzaType,
    onClose: (alias: string) => void,
    lang: LangType
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
                        onClose={() => this.props.onClose(this.props.item.alias)}
                    >
                        <Toast.Header>
                            <strong className="mr-auto">Pizza shop</strong>
                        </Toast.Header>
                        <Toast.Body>{locale.adding[this.props.lang]} {this.props.item.title[this.props.lang]} {locale.pizza[this.props.lang]} {locale.toCart[this.props.lang]}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        lang: state.appSettingReducer.lang
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClose: (alias) => {dispatch(removeToast(alias))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastItem)
