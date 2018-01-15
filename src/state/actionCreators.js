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
	PAUSE,
	UNPAUSE,
} from './actions';

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
const pause = () => ({
	type: PAUSE,
});
const unpause = () => ({
	type: UNPAUSE,
});
const newGame = () => ({
	type: NEW_GAME,
});

export {
	resetScore,
	increaseScore,
	putDownPiece,
	pickUpPiece,
	resetWell,
	stepDown,
	moveLeft,
	moveRight,
	rotate,
	drop,
	pause,
	unpause,
	newGame,
};
