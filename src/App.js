import React, { Component } from 'react';
import MouseTrap from 'mousetrap';
import './App.css';
import { AbstractWell } from './AbstractGame/AbstractWell';
import { AbstractPiece } from './AbstractGame/AbstractPiece';
import { Well } from './Well/Well';
import { Aside } from './Aside/Aside';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { StylePlugin } from './StylePlugin/StylePlugin';
import { Modal } from './Modal/Modal';
const defaultInterval = 150;

class App extends Component {
   constructor() {
      super();
      this.state = Object.assign(this.initialState(10), { firstGame: true });
   };

   bindKeyboard = () => {
      this.unbindKeyboard();
      MouseTrap.bind('a', this.movePieceLeft);
      MouseTrap.bind('d', this.movePieceRight);
      MouseTrap.bind('s', this.rotatePiece);
      MouseTrap.bind('p', this.togglePause);
      MouseTrap.bind('space', this.drop);
   }

   unbindPause = () => {
      MouseTrap.unbind('p');
   }

   unbindKeyboard = () => {
      MouseTrap.unbind(['a', 'd', 's', 'space']);
   }

   triggerLeft = () => MouseTrap.trigger('a');
   triggerRight = () => MouseTrap.trigger('d');
   triggerRotate = () => MouseTrap.trigger('s');
   triggerPause = () => MouseTrap.trigger('p');



   initialState = (width = 10) => {
      const well = new AbstractWell(width);
      return {
         well,
         nextPiece: new AbstractPiece(),
         currentPiece: well.pickUp(new AbstractPiece()),
         score: 0,
         gameLoopId: 0,
         paused: false,
         gameOver: false,
         firstGame: false
      }
   }

   updateState = (...patches) => this.setState(Object.assign({}, this.state, ...patches));

   updatePiece = (updatedPiece) => this.updateState({ currentPiece: updatedPiece });

   checkAndUpdatePiece = (transformedPiece) => {
      if (!this.state.well.collision(transformedPiece)) {
         this.updatePiece(transformedPiece)
      }
   }

   movePieceRight = () => {
      const movedPiece = this.state.currentPiece.moveRight(1);
      this.checkAndUpdatePiece(movedPiece);
   }

   movePieceLeft = () => {
      const movedPiece = this.state.currentPiece.moveLeft(1);
      this.checkAndUpdatePiece(movedPiece);
   }

   drop = () => {
      let movedPiece = this.state.currentPiece;
      let temp;
      while (!this.state.well.collision(temp = movedPiece.moveDown())) {
         movedPiece = temp;
      }
      this.updatePiece(movedPiece);
   }

   rotatePiece = () => {
      const movedPiece = this.state.currentPiece.rotate();
      this.checkAndUpdatePiece(movedPiece);
   }

   gameStep = () => {
      const movedPiece = this.state.currentPiece.moveDown();
      if (this.state.well.collision(movedPiece)) {
         this.nextPiece();
      } else {
         this.updatePiece(movedPiece);
      }
   }

   nextPiece = () => {
      const newWell = this.state.well.putDown(this.state.currentPiece);
      const fullLines = newWell.prune();
      const score = this.state.score + fullLines.number;
      const newState =
         {
            well: fullLines.well,
            currentPiece: fullLines.well.pickUp(this.state.nextPiece),
            nextPiece: new AbstractPiece(),
            score,
         }
      this.updateState(newState);
      if (newState.well.collision(newState.currentPiece)) {
         this.gameOver();
      }
   }

   newGame = () => {
      clearInterval(this.state.gameLoopId);
      const gameLoopId = setInterval(this.gameStep, defaultInterval);
      this.updateState(this.initialState(this.state.width), { gameLoopId });
      this.bindKeyboard();
   }

   gameOver = () => {
      this.stopGame();
      this.updateState({ gameOver: true });
      this.unbindPause();
   }

   stopGame = () => {
      clearInterval(this.state.gameLoopId);
      this.updateState({ gameLoopId: 0 });
      this.unbindKeyboard();
   }

   pauseGame = () => {
      this.stopGame();
      this.updateState({ paused: true });
   }

   unpauseGame = () => {
      const gameLoopId = setInterval(this.gameStep, defaultInterval);
      this.updateState({ gameLoopId }, { paused: false });
      this.bindKeyboard();
   }

   togglePause = () => {
      if (this.state.paused) {
         this.unpauseGame();
      } else {
         this.pauseGame()
      }
   }

   render() {
      return (
         <div className="App">
            <StylePlugin width={this.state.well.width} />
            {this.state.paused ? <Modal message="Paused..." action={this.triggerPause} /> : null}
            {this.state.gameOver ? <Modal message="Game Over!" action={this.newGame} /> : null}
            <Header title="Reactris" />
            <div className="panel panel_main">
               <Well
                  pause={this.triggerPause}
                  well={this.state.well}
                  piece={this.state.currentPiece.getAbsoluteXY()} />
            </div>
            <Aside
               score={this.state.score}
               next={this.state.nextPiece.setPosition([2, 2]).getAbsoluteXY()}
               newGame={this.newGame}
               firstGame={this.state.firstGame}
            />
            <Footer
               left={this.triggerLeft}
               right={this.triggerRight}
               rotate={this.triggerRotate}
            />
         </div>
      );
   }
}

export default App;
