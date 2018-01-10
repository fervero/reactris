import React, { Component } from 'react';
import MouseTrap from 'mousetrap';
import logo from './logo.svg';
import './App.css';
import { AbstractWell } from './AbstractWell';
import { AbstractPiece } from './AbstractPiece';
import { Brick } from './Brick';
import { Well } from './Well';

class App extends Component {
   constructor() {
      super();
      const well = new AbstractWell();
      this.state = {
         well,
         nextPiece: new AbstractPiece(),
         currentPiece: well.pickUp(new AbstractPiece()),
         score: 0,
      };
      MouseTrap.bind('a', this.movePieceLeft);
      MouseTrap.bind('d', this.movePieceRight);
      MouseTrap.bind('s', this.rotatePiece);
      MouseTrap.bind('space', this.movePieceDown);
      MouseTrap.bind('enter', this.nextPiece);
      setInterval(this.movePieceDown, 100);
   }

   transformPiece = (transformedPiece) => {
      if (this.state.well.collision(transformedPiece)) {
         return;
      }
      let newState = {};
      Object.assign(newState, this.state, { currentPiece: transformedPiece });
      this.setState(newState);
   }

   movePieceRight = () => {
      const movedPiece = this.state.currentPiece.moveRight(1);
      this.transformPiece(movedPiece);
   }

   movePieceLeft = () => {
      const movedPiece = this.state.currentPiece.moveLeft(1);
      this.transformPiece(movedPiece);
   }

   movePieceDown = () => {
      const movedPiece = this.state.currentPiece.moveDown();
      if(this.state.well.collision(movedPiece)) {
         this.nextPiece();
      } else {
         this.transformPiece(movedPiece);
      }
   }

   rotatePiece = () => {
      const movedPiece = this.state.currentPiece.rotate();
      this.transformPiece(movedPiece);
   }

   nextPiece = () => {
      const newWell = this.state.well.putDown(this.state.currentPiece);
      const fullLines = newWell.prun();
      const well = (fullLines.number > 0) ? fullLines.well : newWell;
      const newScore = this.state.score + fullLines.number;
      const newState = Object.assign(
         {},
         this.state,
         {
            well,
            currentPiece: well.pickUp(this.state.nextPiece),
            nextPiece: new AbstractPiece(),
            score: newScore,
         },
      );
      this.setState(newState);
   }

   render() {
      return (
         <div className="App">
         <h2 className='score'>Score: {this.state.score}</h2>
            <Well
               well={this.state.well}
               piece={this.state.currentPiece.getAbsoluteXY()} />
         </div>
      );
   }
}

export default App;
