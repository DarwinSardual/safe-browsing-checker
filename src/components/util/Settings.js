import React, {Component} from 'react';
import './Settings.css';

class Settings extends Component{

  render(){
    return(
      <div id="settings">
        <div className="title">
          Settings
        </div>
        <div className="content">
          <label>
            API Key: &nbsp;
            <input type="text" />
          </label>
          <div className="details">
            If you dont have an API key yet, follow this <a href="http://youtube.com">guide</a> to get one.
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
