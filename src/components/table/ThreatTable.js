import React, {Component} from 'react';
import ThreatTableItem from './ThreatTableItem'
import ThreatTableHeader from './ThreatTableHeader'
import ThreatItem from './ThreatItem'


class ThreatTable extends Component{

  render(){
    let items = [];
    const propItems = this.props.items;

    for(let i = 0; i < propItems.length; i++){
      items.push(<ThreatTableItem key={propItems[i].link} index={i + 1} item={propItems[i]}/>)
    }

    return(
      <table>
        <ThreatTableHeader />
        <tbody>
          {items}
        </tbody>
      </table>
    )
  }
}

export default ThreatTable
