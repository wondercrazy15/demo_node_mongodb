import React from 'react';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem, Modal, Button } from 'react-bootstrap';
class BoostrapModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }


    render() {

        const {isOpen} = this.props;
        return (
            <div id="header_page">
                <Modal show={isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.modalBody}</Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                    </Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        );
    }
}

export default BoostrapModal