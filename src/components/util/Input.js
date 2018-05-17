import React, {Component} from 'react'
import "./Input.css";

class Input extends Component{

  constructor(props){
    super(props);

    this.textInput = React.createRef();
  }

  handleClick(event){
    let links;
    links = this.textInput.current.value.split(" ");
    this.props.handleProcess(links);
  }

  render(){
    return(
      <div id="input">
        <textarea rows='5' columns='30' id='inputText' ref={this.textInput}>
        </textarea>
        <br />
        <button id='submit' onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default Input;
