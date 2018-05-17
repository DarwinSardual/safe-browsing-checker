import React, {Component} from 'react';
import './PopupWrapper.css';

class PopupWrapper extends Component{

  render(){
    return(
      <div id="popup-wrapper">
        <a className="close" onClick={this.props.close}>
          &times;
        </a>
        {this.props.children}
      </div>
    );
  }
}
export default PopupWrapper;
