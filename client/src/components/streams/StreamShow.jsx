import React from 'react';
import { connect } from "react-redux";

class StreamShow extends React.Component {
    render() {
        let stream = this.props.stream;// && this.props.streams[this.props.match.params.id];
        return (
            (stream && 
                <div> 
                    <p className="header h3">Stream Information</p>
                    <div>{stream.title}</div>
                    <div>{stream.description}</div>
                </div>
            )
            || <div>Loading...</div>
        );
    }
}

const matchStateToProps = ({streams}, ownProps) => {
    return {
        stream: streams[ownProps.match.params.id]
    }
}
export default connect(matchStateToProps)(StreamShow);