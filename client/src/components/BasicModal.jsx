import React from "react";
import {Modal, Button} from 'react-bootstrap';

class BasicModal extends React.Component {
    constructor(props) {
        super(props);
        console.log('child');
    }

    render() {

        const { show, id, centered, handleConfirmDelete, handleClose } = this.props;
        return (
            <Modal show={show} id={id} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.children}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                    <Button className="btn btn-danger" onClick={this.props.handleConfirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default BasicModal;