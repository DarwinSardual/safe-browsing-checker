import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import Settings from './Settings';
import Menu from './Menu';
import "./Header.css";

class Header extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render(){
    return(
      <div id="header">
        <div className="header-left">
          <Popup trigger={<button className="menu-button"></button>} position="bottom left"
            on="click"
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={false}>
            <Menu settings={this.props.settings} saveSettingsClicked={this.props.saveSettingsClicked} exportDataClicked={this.props.exportDataClicked} />
          </Popup>
        </div>
        <div className="header-center">
          <h1 id="header-title">Safe Browsing Checker</h1>
        </div>
        <div className="header-right">

        </div>
      </div>
    )
  }
}

export default Header;
