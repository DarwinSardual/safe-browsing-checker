import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import Settings from './Settings';
import ExportToCSV from './ExportToCSV';
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
                <Settings settings={this.props.settings} saveSettingsClicked={this.props.saveSettingsClicked} />
              </PopupWrapper>
            )
          }
        </Popup>
        <Popup trigger={<div className="menu-item">Export to CSV</div>} modal closeOnDocumentClick>
          {close =>(
              <PopupWrapper close={close}>
                <ExportToCSV exportDataClicked={this.props.exportDataClicked}/>
              </PopupWrapper>
            )
          }
        </Popup>
      </div>
    );
  }
}

export default Menu;
