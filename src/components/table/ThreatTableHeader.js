import React, {Component} from 'react'

class ThreatTableHeader extends Component{

  render(){
    return(
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            Link
          </th>
          <th>
            Status
          </th>
          <th>
            Threat Type
          </th>
          <th>
            Threat Entry Type
          </th>
        </tr>
      </thead>
    )
  }
}

export default ThreatTableHeader
