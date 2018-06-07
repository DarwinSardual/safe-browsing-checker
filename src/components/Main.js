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
      itemsFailed: [],
      settings: {apiKey: null}
    }

    this.serverDetails = {
      url: 'http://34.224.67.238',
      port: '8081'
    }

    this.links = []

    this.processLinksClicked = this.processLinksClicked.bind(this);
    this.exportDataClicked = this.exportDataClicked.bind(this);
    this.saveSettingsClicked = this.saveSettingsClicked.bind(this);
    this.getSettingsFromTheServer(); // get the api key from the server, if none is found then try to access the fallback key
  }

  componentDidMount(){
    //let promise = this.getDataFromTheServer(this.url, this.body, this.contentType, this.method);
    //this.processData(promise);
  }

  handleProcess(links){

    this.links = []; // clear the links
    let url = "https://safebrowsing.googleapis.com/v4/threatMatches:find";
    let contentType = 'application/json';
    let method = 'POST';

    let body = {
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

    for(let link of links){
      body.threatInfo.threatEntries.push({'url': link});
      this.links.push(link);
    }
    // append the api key before making a request to the server
    url += '?key=' + this.state.settings.apiKey;

    let promise = this.getDataFromTheServer(url, body, contentType, method);
    this.processData(promise);
  }

  handleExport(filter){
    const url = this.serverDetails.url + ':' + this.serverDetails.port +  '/export';
    console.log(url);
    let data = this.getTableData(filter);

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
        if(data)
          if(data.statusCode === 200){
            let url = 'http://' + data.url + ':' +data.port + '/' + data.filename;
            window.open(url);
          }
      })
    });
  }

  handleSettings(params){
    const url = this.serverDetails.url + ':' + this.serverDetails.port + "/settings";
    let contentType = 'application/json';
    let method = 'POST';
    let body = params;
    let promise = this.getDataFromTheServer(url, body, contentType, method);
    const tempThis = this;

    promise.then(function(response){
      if(response.status == 200){
        response.json().then(function(data){
          tempThis.setState({settings: data});
        });
      }
    });
  }


  processData(promise){
    promise.then((response)=>{
      if(response.status === 200){
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

        });
      }else{
        console.log('An error has occured on your request');
      }
    });
  }
  /* this method returns a promise */
  getDataFromTheServer(url, data, contentType, method){

    let params = {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers:{
        'Content-type': contentType
      },
      method: method
    }

    if(data){
      params.body = JSON.stringify(data);
    }

    return fetch(url, params);
  }

  getSettingsFromTheServer(){
    let url = this.serverDetails.url + ':' + this.serverDetails.port + '/settings';
    let contentType = 'application/json';
    let method = 'GET';
    let promise = this.getDataFromTheServer(url, null, contentType, method);
    const tempThis = this; // have a reference to this

    promise.then(function(response){
      response.json().then(function(data){
        // we expect a json object
        tempThis.setState({settings: {apiKey: data.apiKey}}, ()=>{
          console.log(this.state.settings.apiKey);
        });
      })
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

  /* CALLBACKS */

  processLinksClicked(links){
    this.handleProcess(links)
  }

  saveSettingsClicked(params){
    this.handleSettings(params);
  }

  exportDataClicked(filter){
    this.handleExport(filter)
  }

  render(){

    return(
      <div>
        <Header settings={this.state.settings} exportDataClicked={this.exportDataClicked} saveSettingsClicked={this.saveSettingsClicked}
         />
        <div id="body">
          <Input processLinksClicked={this.processLinksClicked} />
          <ThreatTable items={this.state.items} header={this.state.header}/>
          <Status numScanned={this.state.items.length} numPassed={this.state.itemsPassed.length} numFailed={this.state.itemsFailed.length} />
        </div>
      </div>
    )
  }
}

export default Main;
