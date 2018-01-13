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
const defaultInterval = 150;

class App extends Component {
   constructor() {
      super();
      this.state = this.initialState(10);
      this.state.gameLoopId = setInterval(this.gameStep, defaultInterval);
      this.bindKeyboard();
   };

   bindKeyboard = () => {
      MouseTrap.bind('a', this.movePieceLeft);
      MouseTrap.bind('d', this.movePieceRight);
      MouseTrap.bind('s', this.rotatePiece);
      MouseTrap.bind('p', this.togglePause);
      MouseTrap.bind('space', this.drop);
   }

   unbindKeyboard = () => {
      MouseTrap.unbind(['a', 'd', 's', 'space']);
   }

   triggerLeft = () => MouseTrap.trigger('a');
   triggerRight = () => MouseTrap.trigger('d');
   triggerRotate = () => MouseTrap.trigger('s');

   initialState = (width = 10) => {
      const well = new AbstractWell(width);
      return {
         well,
         nextPiece: new AbstractPiece(),
         currentPiece: well.pickUp(new AbstractPiece()),
         score: 0,
         gameLoopId: 0,
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
      const fullLines = newWell.prun();
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
         this.stopGame();
      }
   }

   newGame = () => {
      clearInterval(this.state.gameLoopId);
      const gameLoopId = setInterval(this.gameStep, defaultInterval);
      this.updateState(this.initialState(this.state.width), { gameLoopId });
   }

   stopGame = () => {
      clearInterval(this.state.gameLoopId);
      this.updateState({ gameLoopId: 0 });
      this.unbindKeyboard();
   }

   unpauseGame = () => {
      const gameLoopId = setInterval(this.gameStep, defaultInterval);
      this.updateState({ gameLoopId });
      this.bindKeyboard();
   }

   togglePause = () => {
      if (this.state.gameLoopId) {
         this.stopGame()
      } else {
         this.unpauseGame();
      }
   }

   render() {
      return (
         <div className="App">
            <StylePlugin width={this.state.well.width} />
            <Header title="Reactris" />
            <div className="panel panel_main">
               <Well
                  pause={this.togglePause}
                  well={this.state.well}
                  piece={this.state.currentPiece.getAbsoluteXY()} />
            </div>
            <Aside
               score={this.state.score}
               next={this.state.nextPiece.setPosition([2, 2]).getAbsoluteXY()}
               newGame={this.newGame}
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
