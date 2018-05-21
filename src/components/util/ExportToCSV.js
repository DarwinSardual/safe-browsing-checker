import React, {Component} from 'react';
import './ExportToCSV.css';

class ExportToCSV extends Component{

  constructor(props){
    super(props);
  }

  handleClick(str){
    let s = str.toLowerCase();
    let data = this.props.getTableData(s);
    const url = 'http://127.0.0.1:3010';

    let promise = fetch(url,{
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers:{
        'Content-type': 'application/json'
      },
      method: 'POST'
    });

    promise.then(function(response){
      response.json().then(function(data){
        console.log(data);
      })
    });
  }

  render(){
    return(
      <div id="export-to-csv">
        <div className="title">
          Export
        </div>
        <div className="content">
          <span>Choose the type of data you want to export.</span>
        </div>
        <div className="actions">
          <button onClick={this.handleClick.bind(this, 'all')}>Export all data</button>
          <button onClick={this.handleClick.bind(this, 'pass')}>Export passed data</button>
          <button onClick={this.handleClick.bind(this, 'fail')}>Export failed data</button>
        </div>
      </div>
    );
  }
}

export default ExportToCSV;
