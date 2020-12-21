import React from "react";
import Header from "./Parts/Header";
import {BrowserRouter} from "react-router-dom";
import Routes from "./Parts/Routes/routes";
import {connect} from "react-redux";
import {getFromLocalStorage} from "./Redux/rootReducer";
import {logIn} from "./Redux/actions/auth.actions";

type AppPropsType = {
    isSignedIn: (user) => void
}

class App extends React.Component<AppPropsType, React.ComponentState> {

    componentDidMount() {
        const user = getFromLocalStorage('user')
        if (user?.length) this.props.isSignedIn(JSON.parse(user))
    }

    render() {
        return(
            <BrowserRouter>
                <Header/>
                <Routes/>
            </BrowserRouter>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         lang: state.lang,
//         currency: state.currency
//     }
// }

function mapDispatchToProps(dispatch) {
    return {
        isSignedIn: (user) => dispatch(logIn(user)),
    }
}

export default connect(null, mapDispatchToProps)(App)

