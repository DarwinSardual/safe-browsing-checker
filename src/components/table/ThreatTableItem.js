import React, {Component} from 'react';

class ThreatTableItem extends Component{

  render(){
    return(
      <tbody>
        <tr>
          <td>
            1
          </td>
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
      </tbody>
    )
  }
}

export default ThreatTableItem
