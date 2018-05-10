import React, {Component} from 'react';
import ThreatTableItem from './ThreatTableItem'
import ThreatTableHeader from './ThreatTableHeader'

class ThreatTable extends Component{

  render(){
    return(
      <table>
        <ThreatTableHeader />
        <ThreatTableItem />
      </table>
    )
  }
}

export default ThreatTable
