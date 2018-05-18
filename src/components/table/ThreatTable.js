import React, {Component} from 'react';
import ThreatTableItem from './ThreatTableItem'
import ThreatTableHeader from './ThreatTableHeader'
import ThreatItem from './ThreatItem'
import './ThreatTable.css'


class ThreatTable extends Component{

  render(){
    let items = [];
    const propItems = this.props.items;

    for(let i = 0; i < propItems.length; i++){
      items.push(<ThreatTableItem key={propItems[i].link} index={i + 1} item={propItems[i]}/>)
    }

    return(
      <div id="table">
        <table>
          <thead>
            <ThreatTableHeader header={this.props.header} />
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ThreatTable
