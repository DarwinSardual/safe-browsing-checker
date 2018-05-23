import React, {Component} from 'react';

class ThreatTableItem extends Component{

  render(){
    return(
        <tr className={`${this.props.item.status}`} >
          <th>
            {this.props.index}
          </th>
          <td>
            {this.props.item.link}
          </td>
          <td>
            {this.props.item.status}
          </td>
          <td>
            {this.props.item.threatType}
          </td>
          <td>
            {this.props.item.threatEntryType}
          </td>
        </tr>
    )
  }
}

export default ThreatTableItem
