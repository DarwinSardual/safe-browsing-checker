import React, {Component} from 'react';
import Papa from 'papaparse';

import ThreatTable from './table/ThreatTable';
import ThreatItem from './table/ThreatItem';
import Input from './util/Input';
import Header from './util/Header';
import Status from './util/Status';
import './Main.css';

class Main extends Component{

  constructor(){
    super();
    this.state ={
      links: [],
      items: [],
      numScanned: 0,
      numPassed: 0,
      numFailed: 0
    }

    this.url = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyBY_Eq7FqIYf_JunNL5TpzoN32jQpN-TfM";
    this.contentType = 'application/json';
    this.method = 'POST';

    this.body = {
      client: {
        clientId: 'Eversun',
        clientVersion: '1'
      },
      threatInfo: {
        threatTypes: ['MALWARE', 'UNWANTED_SOFTWARE',  'SOCIAL_ENGINEERING'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL', 'EXECUTABLE'],
        threatEntries: [

        ]
      }
    };
  }

  componentDidMount(){
    //let promise = this.fetchDataFromServer(this.url, this.body, this.contentType, this.method);
    //this.processData(promise);
  }

  handleProcess(links){

    this.body.threatInfo.threatEntries = [];
    let l = [];

    for(let link of links){
      this.body.threatInfo.threatEntries.push({'url': link});
      l.push(links);
    }

    this.setState({links: links}, ()=>{
      let promise = this.fetchDataFromServer(this.url, this.body, this.contentType, this.method);
      this.processData(promise);
    });
  }

  processData(promise){
    promise.then((response)=>{
      response.json().then((data)=>{
        //process threat data's
        let threatItems = {};
        if(data.matches)
          for(let d of data.matches){
            let item = new ThreatItem(d.threat.url, "Failed", d.threatType, d.threatEntryType);
            threatItems[d.threat.url] = item;
          }

        let items = [];
        let scanned = 0;
        let passed = 0;
        let failed = 0;
        for(let link of this.state.links){

          if(!threatItems[link]){
            let item = new ThreatItem(link, "Passed", "None", "None");
            items.push(item)
            scanned++;
            passed++;
          }else{
            items.push(threatItems[link]);
            scanned++;
            failed++;
          }
        }

        this.setState({items: items, numScanned: scanned, numPassed: passed, numFailed: failed});
      })
    });
  }
  /* this method returns a promise */
  fetchDataFromServer(url, data, contentType, method){

    return fetch(url,{
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers:{
        'Content-type': contentType
      },
      method: method
    });
  }

  render(){

    return(
      <div>
        <Header id="headerClass" />
        <div id="body">
          <Input id="inputComponent" handleProcess={this.handleProcess.bind(this)} />
          <ThreatTable items={this.state.items}/>
          <Status numScanned={this.state.numScanned} numPassed={this.state.numPassed} numFailed={this.state.numFailed} />
        </div>
      </div>
    )
  }
}

export default Main;
