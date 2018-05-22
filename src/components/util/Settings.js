import React, {Component} from 'react';
import './Settings.css';

class Settings extends Component{

  constructor(props){
    super(props);

    this.apiInput = React.createRef();
    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(event){
    let key = this.apiInput.current.value;
    let params = {apiKey: key}
    this.props.saveSettingsClicked(params)
  }

  render(){
    return(
      <div id="settings">
        <div className="title">
          Settings
        </div>
        <div className="content">
          <label>
            API Key: &nbsp;
            <input defaultValue={this.props.settings.apiKey} type="text" ref={this.apiInput} />
          </label>
          <div className="details">
            If you dont have an API key yet, follow this <a href="http://youtube.com">guide</a> to get one.
          </div>
          <div className="actions">
            <button onClick={this.handleClick}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
