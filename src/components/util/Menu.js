import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import Settings from './Settings';
import PopupWrapper from './PopupWrapper';

import './Menu.css'

class Menu extends Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="menu">
        <Popup trigger={<div className="menu-item">Settings</div>} modal closeOnDocumentClick>
          {close =>(
              <PopupWrapper close={close}>
                <Settings />
              </PopupWrapper>
            )
          }
        </Popup>
        <div className="menu-item">Export to CSV</div>
      </div>
    );
  }
}

export default Menu;
