import React, {Component} from 'react'

class ThreatTableHeader extends Component{

  render(){
    return(
        <tr>
          <th>
            {this.props.header.col1}
          </th>
          <th>
            {this.props.header.col2}
          </th>
          <th>
            {this.props.header.col3}
          </th>
          <th>
            {this.props.header.col4}
          </th>
          <th>
            {this.props.header.col5}
          </th>
        </tr>
    )
  }
}

export default ThreatTableHeader
