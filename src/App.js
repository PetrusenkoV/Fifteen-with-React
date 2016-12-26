import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './Square.js';

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      boardState: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]     
    };
  }   

  componentDidMount(){
    this.shuffleBoardState(this.state.boardState);
  }

  getBlankPosition(){
    return this.state.boardState.indexOf(0);
  }
  
  move(index){
    let neighbours = [];

    neighbours = neighbours.concat(this.leftNeighbour(index));
    neighbours = neighbours.concat(this.rightNeighbour(index));
    neighbours = neighbours.concat(this.topNeighbour(index));
    neighbours = neighbours.concat(this.bottomNeighbour(index));

    for(let i = 0; i < neighbours.length; i++){      
      if(neighbours[i] === this.getBlankPosition()){        
        this.swapValues(index);
        break;
      }
    }    
  }

  swapValues(index){
    let boardState = this.state.boardState;
    let blankPosition = this.getBlankPosition();

    boardState[blankPosition] = boardState[index];
    boardState[index] = 0;

    this.setState({boardState: boardState});    
  }

  leftNeighbour(index){
    if(index !== 0 && index !== 4 && index !== 8 && index !== 12){
      return index - 1;
    }
  }

  rightNeighbour(index){
    if(index !== 3 && index !== 7 && index !== 11 && index !== 15){
      return index + 1;
    }
  }

  topNeighbour(index){
    if(index !== 0 && index !== 1 && index !== 2 && index !== 3){
      return index - 4;
    }
  }

  bottomNeighbour(index){
    if(index !== 12 && index !== 13 && index !== 14 && index !== 15){
      return index + 4;
    }
  }

  congratulations(){        
    if(this.isBoardInInitialState())
    {
      return(
        <div>
          <h1>Congratulations!</h1>
          <input type="button" onClick={this.newGameHandler.bind(this)} id="NewGame" value="New Game"/>
        </div>
      )
    }
    else{
      return(<input type="button" onClick={this.cheat.bind(this)} id="CheatButton" value="Cheat!"/>)
    }
  }

  isBoardInInitialState(){
    let initialState = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
    let boardState = this.state.boardState;

    for(let i = 0; i < boardState.length; i++){
      if(initialState[i] !== boardState[i]){
        return false;
      }
    }

    return true;
  }

  newGameHandler(){
    this.shuffleBoardState(this.state.boardState);
  }

  shuffleBoardState(boardState) {
  let currentIndex = boardState.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = boardState[currentIndex];
    boardState[currentIndex] = boardState[randomIndex];
    boardState[randomIndex] = temporaryValue;
  }

  this.setState({boardState});
}

  cheat(){
    this.setState({boardState: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15]});
  }
  render(){
    return (
      <div>
        <div>
          {this.state.boardState.map((value, index) => <Square value={value} index={index} handler={this.move.bind(this, index)}/>)}              
        </div>
        {this.congratulations()}  
      </div>
    );
  }
}

export default Board;
