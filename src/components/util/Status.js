import React, {Component} from 'react';

class Status extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id="status">
        <div>
          <span>Links scanned: {this.props.numScanned}</span>&nbsp;
          <span>Links passed: {this.props.numPassed}</span>&nbsp;
          <span>Links failed: {this.props.numFailed}</span>&nbsp;
        </div>
      </div>
    );
  }
}

export default Status;
