import {
	NEW_GAME,
	RESET_SCORE,
	INCREASE_SCORE,
	WELL_PICKUP,
	WELL_PUTDOWN,
	WELL_RESET,
	STEP_DOWN,
	MOVE_LEFT,
	MOVE_RIGHT,
	ROTATE,
	DROP,
	UPDATE_PAUSE_ATTRIBUTE,
} from './actions';
import { DEFAULT_INTERVAL } from '../utils';

let gameLoopId = 0;

const resetScore = () => ({ type: RESET_SCORE });
const increaseScore = (val) => ({
	type: INCREASE_SCORE,
	val,
});
const putDownPiece = (piece) => ({
	type: WELL_PUTDOWN,
	val: piece,
});
const pickUpPiece = (piece) => ({
	type: WELL_PICKUP,
	val: piece,
});
const stepDown = (number = 1) => ({
	type: STEP_DOWN,
	val: number,
});
const moveRight = (number = 1) => ({
	type: MOVE_RIGHT,
	val: number,
});
const rotate = (number = 1) => ({
	type: ROTATE,
	val: number,
});
const moveLeft = (number = 1) => ({
	type: MOVE_LEFT,
	val: number,
});
const drop = () => ({
	type: DROP,
});
const resetWell = (width) => ({
	type: WELL_RESET,
	val: width
});
const updatePauseAttribute = (attr) => ({
	type: UPDATE_PAUSE_ATTRIBUTE,
	val: attr,
});
const pause = () =>
	(dispatch) => {
		clearInterval(gameLoopId);
		gameLoopId = 0;
		dispatch(updatePauseAttribute(true));
	}
const stopGame = () =>
	(dispatch) => {
		clearInterval(gameLoopId);
		gameLoopId = 0;
	}
const unpause = () =>
	(dispatch) => {
		clearInterval(gameLoopId);
		gameLoopId = setInterval(() =>
			dispatch(stepDown()),
			DEFAULT_INTERVAL);
		dispatch(updatePauseAttribute(false));
	}
const newGame = () => ({
	type: NEW_GAME,
});

const startGame = () =>
	(dispatch) => {
		dispatch(newGame());
		dispatch(unpause());
	}

export {
	resetScore,
	increaseScore,
	putDownPiece,
	pickUpPiece,
	resetWell,
	stepDown,
	startGame,
	moveLeft,
	moveRight,
	rotate,
	drop,
	pause,
	unpause,
	newGame,
	stopGame,
};
