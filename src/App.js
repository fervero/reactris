import React, { Component } from 'react';
import { connect } from 'react-redux';
import MouseTrap from 'mousetrap';
import './App.css';
import Well from './Well/Well';
import Aside from './Aside/Aside';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import StylePlugin from './StylePlugin/StylePlugin';
import Modal from './Modal/Modal';
import store from './state/store';
import {
	resetWell,
	stepDown,
	moveLeft,
	moveRight,
	rotate,
	drop,
	startGame,
	stopGame,
	pause,
	unpause,
} from './state/actionCreators';
import { DEFAULT_WIDTH } from './utils';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = Object.assign({ width: DEFAULT_WIDTH });
		props.dispatch(resetWell(DEFAULT_WIDTH));
		store.subscribe(this.watchStore);
	};

	watchStore = () => {
		const state = store.getState();
		if (state.gameOver /*&& this.state.gameLoopId*/) {
			this.gameOver();
		}
	}

// User interface - keyboard & mouse - functions
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


	// Piece move functions
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

	// Game control functions
	gameStep = () => {
		this.props.dispatch(stepDown());
	}

	newGame = () => {
		this.bindKeyboard();
		this.props.dispatch(startGame());
	}

	gameOver = () => {
		if (this.props.gameOver) return;
		this.stopGame();
		this.unbindPause();
	}

	stopGame = () => {
		this.props.dispatch(stopGame());
	}

	pauseGame = () => {
		this.props.dispatch(pause());
		this.unbindKeyboard();
	}

	unpauseGame = () => {
		this.props.dispatch(unpause());
		this.bindKeyboard();
	}

	togglePause = () => {
		if (this.props.paused) {
			this.unpauseGame();
		} else {
			this.pauseGame()
		}
	}

	render() {
		return (
			<div className="App">
				<StylePlugin width={this.state.width} />
				{this.props.paused ? <Modal message="Paused..." action={this.triggerPause} /> : null}
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

const mapStateToProps = (state) => ({
	gameOver: state.gameOver,
	paused: state.paused,
});

export default connect(mapStateToProps)(App);
