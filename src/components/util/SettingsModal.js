import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Settings.css';

class SettingsModal extends Component{

  constructor(props){
    super(props);

    this.apiInput = React.createRef();
    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(event){
    let key = this.apiInput.current.value;
    let params = {apiKey: key}
    this.props.toggle();
    this.props.saveSettingsClicked(params)
  }

  render(){
    return(
      <div id="settings">
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} centered={true}>
          <ModalHeader toggle={this.props.toggle}>Settings</ModalHeader>
          <ModalBody>
          <div className="content">
            <label>
              API Key: &nbsp;
              <input defaultValue={this.props.settings.apiKey} type="text" ref={this.apiInput} />
            </label>
            <div className="details">
              If you dont have an API key yet, follow this <a href="http://developers.google.com/safe-browsing/v4/get-started">guide</a> to get one.
            </div>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>Save</Button>
          </ModalFooter>
          </Modal>
      </div>
    )
  }
}

export default SettingsModal;
