import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import _ from 'lodash';

import BasicModal from "../BasicModal";
import { getStreams, deleteStream } from "../../actions/streamActions";


class StreamList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteModal: false,
            selectedForDelete: null
        }
    }

    buildStreamList = () => {
        let allStream = [];
        Object.entries(this.props.streams).forEach(stream => {
            allStream.push(
                <div className="row" key={stream[0]}>
                    <div className="four wide column">
                        <div className="row"><i className="icon camera"></i> 
                            <Link to={`/streams/show/${stream[1].id}`} className="header">
                                {stream[1].title}
                            </Link>
                        </div>
                        <div className="row">{stream[1].description}</div>
                    </div>
                    {this.props.userId && this.props.userId === stream[1].userId &&
                        this.renderAdminButtons(stream[0])
                    }
                </div>
            )
        });

        return allStream;
    }
    
    renderAdminButtons = (streamId) => {
        return (
            <>
                <div className="two wide column">
                    <button className="ui secondary basic mini button">
                        <Link to={{
                                pathname: `/streams/edit/${streamId}`,
                                state:  { 
                                    streamId: streamId 
                                },
                            }}
                            style={{ textDecoration: 'none'}}
                        >
                            edit
                        </Link>
                    </button>
                </div>
                <div className="two wide column">
                    <button className="ui mini button negative" onClick={ () => { 
                        this.setState(
                            {   showDeleteModal: true, selectedForDelete: streamId }
                        )   
                    }}
                    >
                        delete
                    </button>
                </div>
            </>
        )
    }

    onDelete = () => {
        this.props.deleteStream(this.state.selectedForDelete).then(() => {
            this.handleClose();
        });;
    }

    handleModalClose = () => {
        this.setState({
            selectedForDelete: null,
            showDeleteModal: false
        });
    }

    render() {

        return (
            <>
                {this.props.isSignedIn && 
                    <button className="ui button">
                        <Link to="/streams/new">Create Stream</Link>
                    </button>
                }
                <div className="ui small header"> StreamList </div>
                <div className="ui grid">
                    {this.buildStreamList()}
                </div>

                <BasicModal id='deleteStreamConfirmationModal' centered 
                    show={this.state.showDeleteModal}
                    handleConfirmDelete={this.onDelete}
                    handleClose={this.handleModalClose}
                >
                    <div>Are you sure??</div>
                </BasicModal>
            </>
        );
    }
};

const mapStateToProps = ({streams, auth: {user} = {}}) => {
    return { 
        streams: streams,
        isSignedIn: user.isSignedIn,
        userId: user.isSignedIn ? user.googleUser.getBasicProfile().getId() : null
    };
}

export default connect(mapStateToProps, { getStreams, deleteStream })(StreamList);