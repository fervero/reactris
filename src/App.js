import React, { Component } from 'react';
import MouseTrap from 'mousetrap';
import './App.css';
import { AbstractWell } from './AbstractWell';
import { AbstractPiece } from './AbstractPiece';
import { Well } from './Well';
const defaultInterval = 150;

class App extends Component {
   constructor() {
      super();
      const well = new AbstractWell();
      this.state = {
         well,
         nextPiece: new AbstractPiece(),
         currentPiece: well.pickUp(new AbstractPiece()),
         score: 0,
         gameLoopId: 0,
      };
      MouseTrap.bind('a', this.movePieceLeft);
      MouseTrap.bind('d', this.movePieceRight);
      MouseTrap.bind('s', this.rotatePiece);
      MouseTrap.bind('p', this.togglePause);
      MouseTrap.bind('space', this.gameStep);
      MouseTrap.bind('enter', this.nextPiece);
      this.state.gameLoopId = setInterval(this.gameStep, 150);
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

   gameStep = () => {
      const movedPiece = this.state.currentPiece.moveDown();
      if (this.state.well.collision(movedPiece)) {
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
      if (newState.well.collision(newState.currentPiece)) {
         this.stopGame();
      }
   }

   stopGame = () => {
      clearInterval(this.state.gameLoopId);
      this.setState(Object.assign({}, this.state, { gameLoopId: 0 }))
   }

   startGame = () => {
      const gameLoopId = setInterval(this.gameStep, 150);
      this.setState(Object.assign({}, this.state, { gameLoopId }));
   }

   togglePause = () => {
      if (this.state.gameLoopId) {
         this.stopGame()
      } else {
         this.startGame();
      }
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
