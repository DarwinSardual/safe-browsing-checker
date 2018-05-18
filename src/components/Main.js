import React, {Component} from 'react';

import ThreatTable from './table/ThreatTable';
import ThreatItem from './table/ThreatItem';
import ThreatHeader from './table/ThreatHeader';
import Input from './util/Input';
import Header from './util/Header';
import Status from './util/Status';

import './Main.css';

class Main extends Component{

  constructor(){
    super();
    this.state ={
      header: new ThreatHeader("#", "Link", "Status", "Threat Type", "Threat Entry Type"),
      items: [],
      itemsPassed: [],
      itemsFailed: []
    }

    this.links = [];
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

    for(let link of links){
      this.body.threatInfo.threatEntries.push({'url': link});
      this.links.push(link);
    }

    let promise = this.fetchDataFromServer(this.url, this.body, this.contentType, this.method);
    this.processData(promise);
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
        let itemsPassed = [];
        let itemsFailed = [];
        for(let link of this.links){
          if(!threatItems[link]){
            let item = new ThreatItem(link, "Passed", "None", "None");
            items.push(item)
            itemsPassed.push(item)
          }else{
            items.push(threatItems[link]);
            itemsFailed.push(threatItems[link]);
          }
        }

        this.setState({items: items, itemsPassed: itemsPassed, itemsFailed: itemsFailed});
        this.links = []; // clear the links
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

  getTableData(type){
    let param = {
      fields: this.state.header.toArray(),
      data:[]
    }
    let items;

    if(type == 'pass')
      items = this.state.itemsPassed;
    else if(type == 'fail')
      items = this.state.itemsFailed;
    else
      items = this.state.items;

    for(let item of items){
      param.data.push(item.toArray());
    }

    return param;
  }

  render(){

    return(
      <div>
        <Header getTableData={this.getTableData.bind(this)} />
        <div id="body">
          <Input handleProcess={this.handleProcess.bind(this)} />
          <ThreatTable items={this.state.items} header={this.state.header}/>
          <Status numScanned={this.state.items.length} numPassed={this.state.itemsPassed.length} numFailed={this.state.itemsFailed.length} />
        </div>
      </div>
    )
  }
}

export default Main;
