import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import GoogleAuthComponent from './GoogleAuthComponent';
import { getStreams } from "../actions/streamActions";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.store.dispatch(getStreams());
    }
    render() {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">Streamer</Link>
                <div className="right menu">
                    <Link to="/streams" className="item">
                        All streams
                    </Link>
                </div>
                <div className="right menu">
                    <GoogleAuthComponent store={this.props.store}/>
                </div>
            </div>
        );
    }
}

export default Header;