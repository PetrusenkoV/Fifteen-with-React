import React, { Component } from 'react';

class Square extends Component {
  constructor(props){
    super(props);
    this.state = {
      leftEdge: [0,4,8,12]
    } ;       
  }

  createClassName(){
    var className = this.props.value === 0 ? "SquareEmpty " : "Square ";
    
    for(let i = 0; i < this.state.leftEdge.length; i++){
      if(this.props.index === this.state.leftEdge[i]){
        className += "SquareClearLeft"
      }
    }

    return className;
  }

  renderInnerSquare(className){
    if(this.props.value!==0){
      return (<span>{this.props.value}</span>);
    }
  }

  renderSquare(){
    var className = this.createClassName();
    
    return (
       <div className={className} onClick={this.props.handler}>
        <span>
          {this.renderInnerSquare(className)}
        </span>
        </div>
      );       
  }
  
  render() {    
    return(
      this.renderSquare()
    );
  }  
}

export default Square;
