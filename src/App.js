import React, { Component } from 'react';
import { connect } from 'react-redux';
import MouseTrap from 'mousetrap';
import './App.css';
import AbstractWell from './AbstractGame/AbstractWell';
import AbstractPiece from './AbstractGame/AbstractPiece';
import Well from './Well/Well';
import Aside from './Aside/Aside';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import StylePlugin from './StylePlugin/StylePlugin';
import Modal from './Modal/Modal';
import {
	startFirstGame,
	increaseScore,
	resetWell,
	putDownPiece,
	stepDown,
	moveLeft,
	moveRight,
	rotate,
	drop,
} from './state/actionCreators';
const defaultInterval = 150;

class App extends Component {
	constructor(props) {
		super();
		this.state = Object.assign(this.initialState(10));
		props.dispatch(resetWell(10));
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
		return {
			gameLoopId: 0,
			paused: false,
			width: width,
		}
	}

	updateState = (...patches) => this.setState(Object.assign({}, this.state, ...patches));

	updatePiece = (updatedPiece) => this.updateState({ currentPiece: updatedPiece });

	movePieceRight = () => {
		this.props.dispatch(moveRight());
	}

	movePieceLeft = () => {
		this.props.dispatch(moveLeft());
	}

	rotatePiece = () => {
		this.props.dispatch(rotate());
	}

	drop = () => {
		this.props.dispatch(drop());
	}

	gameStep = () => {
		this.props.dispatch(stepDown(1));
	}

	newGame = () => {
		clearInterval(this.state.gameLoopId);
		const gameLoopId = setInterval(this.gameStep, defaultInterval);
		this.updateState(this.initialState(this.state.width), { gameLoopId });
		this.bindKeyboard();
		this.props.dispatch(startFirstGame());
		this.props.dispatch(resetWell(10));
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
					<StylePlugin width={this.state.width} />
					{this.state.paused ? <Modal message="Paused..." action={this.triggerPause} /> : null}
					{this.props.gameOver ? <Modal message="Game Over!" action={this.newGame} /> : null}
					<Header title="Reactris" />
					<div className="panel panel_main">
						<Well
							pause={this.triggerPause} />
					</div>
					<Aside
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

// export default App;


const mapStateToProps = (state) => ({
   gameOver: state.gameOver,
});

export default connect(mapStateToProps)(App);
