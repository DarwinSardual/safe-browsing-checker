import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ExportToCSV.css';

class ExportToCSVModal extends Component{

  constructor(props){
    super(props);
  }

  handleClick(str){
    let s = str.toLowerCase();
    this.props.toggle();
    this.props.exportDataClicked(s);
  }

  render(){
    return(
      <div id="export-to-csv">
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} centered={true}>
          <ModalHeader toggle={this.props.toggle}>Export</ModalHeader>
          <ModalBody>
            <div className="content">
              <span>Choose the type of data you want to export.</span>
            </div>
          </ModalBody>
          <div className="actions">
            <Button color="primary" onClick={this.handleClick.bind(this, 'all')}>Export all data</Button>
            <Button color="success" onClick={this.handleClick.bind(this, 'pass')}>Export passed data</Button>
            <Button color="danger" onClick={this.handleClick.bind(this, 'fail')}>Export failed data</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ExportToCSVModal;
