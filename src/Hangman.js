import React, { Component } from 'react';
import {randomword} from './RandomWord'
import image0 from './images/0.jpg'
import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg'
import image4 from './images/4.jpg'
import image5 from './images/5.jpg'
import image6 from './images/6.jpg'
import "./Hangman.css"

export default class Hangman extends Component {
   static defaultProps={
        maxWrong:6,
        images:[image0,image1,image2,image3,image4,image5,image6]
    }
    constructor(props){
        super(props)
        this.state={
            noOfWrong:0,
            guessed:new Set(),
            answer:randomword()
        }
        this.handleGuess=this.handleGuess.bind(this)
        this.reset=this.reset.bind(this)
    }
    reset(){
        this.setState({
            noOfWrong:0,
            guessed:new Set(),
            answer:randomword()
        })
    }

    guesseWord(){
        return this.state.answer
        .split('')
        .map((letter)=>(this.state.guessed.has(letter)? letter:"_"))
    }

    handleGuess(e){
        let letter=e.target.value;
        this.setState((st)=>({
            guessed:st.guessed.add(letter),
            noOfWrong: st.noOfWrong+(st.answer.includes(letter) ? 0 : 1)
        }))
    }

    generateKeypad(){
        return 'abcdefghijkklmnopqrstuvwxyz'.split('').map((letter)=>(
            <button key ={letter} value={letter} onClick={this.handleGuess} disabled={this.state.guessed.has(letter)}>
                {letter}
            </button>
        ))
    }


  render() {
      const gameOver=this.state.noOfWrong>=this.props.maxWrong;
      const isWinner=this.guesseWord().join("")===this.state.answer
      let gameState=this.generateKeypad();
      if (isWinner) gameState="You have won the Game";
      if (gameOver) gameState="Better luck NExt Time";
      let restart=gameOver || isWinner
    return (
        
        <div className='Hangman'>
            <h2>Hangman</h2>
            <img src={this.props.images[this.state.noOfWrong]} alt="HangMan"/>
            <p>
                Guessed left: {this.props.maxWrong-this.state.noOfWrong}/{this.props.maxWrong}
            </p>

            <p>Guess the Programming Language</p>
            <p className='Hangman-word'>
                {!gameOver ? this.guesseWord() :this.state.answer.toLowerCase()}
            </p>
            <p className='Hangman-btns'>{gameState}</p>
            {restart &&(
                <button id='reset' onClick={this.reset}>
                    Restart ?
                </button>
            )}

        </div>
        


    );
  }
}

