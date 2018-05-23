import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './PopupWrapper.css';

class PopupWrapper extends Component{

  render(){
    return(
      <div id="popup-wrapper">
      <Modal isOpen={this.state.settingsModal} toggle={this.toggleSettings}>
          <ModalHeader toggle={this.toggleSettings}>this.props.title</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleSettings}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleSettings}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default PopupWrapper;
