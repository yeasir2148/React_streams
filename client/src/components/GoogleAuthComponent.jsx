import React from 'react';
import { connect } from "react-redux";
import { initiateGauthInstance } from "../actions/initiateGauthInstanceAction";
import { loginGoogleUser } from '../actions/loginGoogleUserAction';
import { logoutGoogleUser } from '../actions/logoutGoogleUserAction';

class GoogleAuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.Gapi = window.gapi;
    }

    componentDidMount() {
        this.props.initiateGauthInstance();
    }

    render() {
        return (
            this.props.isSignedIn === null
            ? <button className="ui button">Loading...</button>
            : 
            (!this.props.isSignedIn
                ? <button className="ui red google button" onClick={this.props.loginGoogleUser}>
                    <i className="google icon"></i>Login</button>
                : <button className="ui red google button" onClick={this.props.logoutGoogleUser}>
                    <i className="google icon"></i>{this.props.googleUser.getBasicProfile().getName()}, Logout</button>
            )
        );
    }
}

const mapStateToProps = (currentState) => {
    return {
        isSignedIn: currentState.auth.user.isSignedIn,
        googleUser: currentState.auth.user.googleUser
    }
}

const mapDispatchToProps = {
    loginGoogleUser,
    initiateGauthInstance,
    logoutGoogleUser
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuthComponent);