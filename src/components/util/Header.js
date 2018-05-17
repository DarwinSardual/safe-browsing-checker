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
        <div className="headerLeft">
          <Popup trigger={<button className="settingsButton"></button>} position="bottom left"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: "0px", border: "none" }}
      arrow={false}>
            <Menu />
          </Popup>
        </div>
        <div className="headerCenter">
          <h1 id="headerTitle">Safe Browsing Checker</h1>
        </div>
        <div className="headerRight">

        </div>
      </div>
    )
  }
}

export default Header;
