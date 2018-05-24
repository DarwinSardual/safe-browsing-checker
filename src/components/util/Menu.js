import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import SettingsModal from './SettingsModal';
import ExportToCSVModal from './ExportToCSVModal';
import PopupWrapper from './PopupWrapper';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './Menu.css'

class Menu extends Component{

  constructor(props){
    super(props)
    this.state = {
      settingsModal: false,
      exportModal: false
    }
    this.toggleSettings = this.toggle.bind(this, 'settings');
    this.toggleExport = this.toggle.bind(this, 'export');
  }

  toggle(type){

    console.log("Darwin");

    let params;
    if(type === 'settings'){
      params = {settingsModal: !this.state.settingsModal}
    }else if(type === 'export'){
      params = {exportModal: !this.state.exportModal}
    }

    this.setState(params);
  }

  render(){
    return(
      <div className="menu">
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle className="menu-toggle" nav caret>
                Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.toggleSettings}>
              Settings
              <SettingsModal isOpen={this.state.settingsModal} toggle={this.toggleSettings}
                settings={this.props.settings} saveSettingsClicked={this.props.saveSettingsClicked} />
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.toggleExport}>
              Export
              <ExportToCSVModal isOpen={this.state.exportModal} toggle={this.toggleExport}
               exportDataClicked={this.props.exportDataClicked}
               />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      </div>
    );
  }
}



export default Menu;
