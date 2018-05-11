import React, {Component} from 'react';
import ThreatTableItem from './ThreatTableItem'
import ThreatTableHeader from './ThreatTableHeader'
import ThreatItem from './ThreatItem'


class ThreatTable extends Component{

  render(){

    let item = new ThreatItem("youtube.com", "passed", "none", "none")

    return(
      <table>
        <ThreatTableHeader />
        <ThreatTableItem item={item}/>
      </table>
    )
  }
}

export default ThreatTable
