import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import Menu from './Menu';
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
import "./Header.css";

class Header extends Component{

  constructor(props){
    super(props)
    this.state={
      menuDropdown: false
    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <div id="header">
      <Navbar color="black" light expand="md">
        <NavbarBrand href="/">Safe Browsing Checker</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Nav className="ml-auto" navbar>
          <Menu settings={this.props.settings} saveSettingsClicked={this.props.saveSettingsClicked} exportDataClicked={this.props.exportDataClicked} />
        </Nav>
      </Navbar>
      </div>
    )
  }
}

export default Header;
