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
                <Settings />
              </PopupWrapper>
            )
          }
        </Popup>
        <Popup trigger={<div className="menu-item">Export to CSV</div>} modal closeOnDocumentClick>
          {close =>(
              <PopupWrapper close={close}>
                <ExportToCSV getTableData={this.props.getTableData} />
              </PopupWrapper>
            )
          }
        </Popup>
      </div>
    );
  }
}

export default Menu;
