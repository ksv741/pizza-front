import React, {FormEvent} from "react";
import {Alert, Form, Spinner} from "react-bootstrap";
import {Button, Tab, Tabs} from "react-bootstrap";
import {signIn, signUp} from "../../Redux/actions/auth.actions";
import {connect} from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {locale} from "../../Utils/app.lang";
import {LangType} from "../../AppTypes";

type AuthPageProps = {
    onSignUp: (email, password, name) => void,
    onSignIn: (email, password) => void,
    isLoading: boolean,
    error: string,
    lang: LangType,
} & RouteComponentProps

class AuthPage extends React.Component<AuthPageProps> {

    signUpHandler = async (e: FormEvent) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        const name = e.target[2].value
        await this.props.onSignUp(email, password, name)
        if (!this.props.error) this.props.history.push('/')
    }

    signInHandler = async (e: FormEvent) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        await this.props.onSignIn(email, password)
        if (!this.props.error) this.props.history.push('/')
    }

    renderSignUp = () => {
        return (
            <Form onSubmit={this.signUpHandler}>
                <Form.Group controlId="signUpEmail">
                    <Form.Label>{locale.email[this.props.lang]}</Form.Label>
                    <Form.Control required name='email' type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="signUpPassword">
                    <Form.Label>{locale.password[this.props.lang]}</Form.Label>
                    <Form.Control required name='password' type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="signUpName">
                    <Form.Label>{locale.name[this.props.lang]}</Form.Label>
                    <Form.Control required name='name' type="text" placeholder="Name" />
                </Form.Group>

                {this.renderButtonBlock()}
            </Form>
        )
    }

    renderSignIn = () => {
        return (
            <Form onSubmit={this.signInHandler}>
                <Form.Group controlId="signInEmail">
                    <Form.Label>{locale.email[this.props.lang]}</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="signInPassword">
                    <Form.Label>{locale.password[this.props.lang]}</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" />
                </Form.Group>

                {this.renderButtonBlock()}

            </Form>
        )
    }

    renderSpinner = () => {
        return (
            <Spinner
                animation="border"
                variant="warning"
                style={{
                    display: 'flex',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            />
        )
    }

    renderButtonBlock = () => {
        if (this.props.isLoading) this.renderSpinner()

        return (
            <Button variant="success" type="submit" disabled={this.props.isLoading}>
                {locale.signin[this.props.lang]}
            </Button>
        )
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
            <div className={'container'} style={{paddingBottom: 10, paddingTop: 10}}>
                {this.renderAlertBlock()}
                <Tabs defaultActiveKey="signup" id="uncontrolled-tab-example">
                    <Tab eventKey="signup" title={locale.signup[this.props.lang]}>
                        {this.renderSignUp()}
                    </Tab>
                    <Tab eventKey="signin" title={locale.signin[this.props.lang]}>
                        {this.renderSignIn()}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.appSettingReducer.error,
        isLoading: state.appSettingReducer.isLoading,
        lang: state.appSettingReducer.lang,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSignUp: (email, password, name) => dispatch(signUp(email, password, name)),
        onSignIn: (email, password) => dispatch(signIn(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)

