import React, {FormEvent} from "react";
import {Alert, Form, Spinner} from "react-bootstrap";
import {Button, Tab, Tabs} from "react-bootstrap";
import {signIn, signUp} from "../../Redux/actions/auth.actions";
import {connect} from "react-redux";
import { RouteComponentProps } from "react-router-dom";

type AuthPageProps = {
    onSignUp: (email, password, name) => void,
    onSignIn: (email, password) => void,
    isLoading: boolean,
    error: string,
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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required name='email' type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="signUpPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name='password' type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="signUpName">
                    <Form.Label>Name</Form.Label>
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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="signInPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" />
                </Form.Group>

                {this.renderButtonBlock()}

            </Form>
        )
    }

    renderButtonBlock = () => {
        if (this.props.isLoading) {
            return <Spinner animation="border" variant="warning" />
        }

        return (
            <Button variant="success" type="submit" disabled={this.props.isLoading}>
                Sign In
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
            <div className={'container'}>
                {this.renderAlertBlock()}
                <Tabs defaultActiveKey="signup" id="uncontrolled-tab-example">
                    <Tab eventKey="signup" title="Sign Up">
                        {this.renderSignUp()}
                    </Tab>
                    <Tab eventKey="signin" title="Sign In">
                        {this.renderSignIn()}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.appSettingReducer.isLoading,
        error: state.appSettingReducer.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSignUp: (email, password, name) => dispatch(signUp(email, password, name)),
        onSignIn: (email, password) => dispatch(signIn(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)

