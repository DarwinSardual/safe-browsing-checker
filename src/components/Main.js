import React, {Component} from 'react'

import ThreatTable from './table/ThreatTable'
import ThreatItem from './table/ThreatItem'
import Input from './io/Input'
import Papa from 'papaparse'

class Main extends Component{

  constructor(){
    super();
    this.state ={
      links: {},
      items: []
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
      //let item = new ThreatItem(link, 'Passed', 'None', 'None');
      //items.push(item);
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
        for(let d of data.matches){
          let item = new ThreatItem(d.threat.url, "Failed", d.threatType, d.threatEntryType);
          threatItems[d.threat.url] = item;
        }

        let items = [];
        for(let link of this.state.links){
          if(!threatItems[link]){
            let item = new ThreatItem(link, "Passed", "None", "None");
            items.push(item)
          }
          else
            items.push(threatItems[link]);
        }

        this.setState({items: items}, ()=>{
          console.log(this.state.items);
        });
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
        <Input handleProcess={this.handleProcess.bind(this)} />
        <ThreatTable items={this.state.items}/>
      </div>
    )
  }
}

export default Main;
