import React, {Component} from 'react'
import "./Input.css";
import { Button } from 'reactstrap';

class Input extends Component{

  constructor(props){
    super(props);

    this.textInput = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    let links;
    links = this.textInput.current.value.trim();
    if(links !== ''){
      links = links.split(" ");
      console.log(links);
      this.props.processLinksClicked(links);
    }else{
      this.props.processLinksClicked([]);
    }

  }

  render(){
    return(
      <div id="input">
        <textarea rows='5' columns='10' id='inputText' ref={this.textInput}>
        </textarea>
        <br />
        <Button id='submit' color="primary" onClick={this.handleClick}>Process links</Button>
      </div>
    );
  }
}

export default Input;
