import {
	START_FIRST_GAME,
	INCREASE_SCORE,
	RESET_SCORE,
	WELL_PUTDOWN,
	WELL_RESET,
	STEP_DOWN,
	MOVE_LEFT,
	MOVE_RIGHT,
	ROTATE,
	DROP,
} from './actions';
import { increaseScore, resetScore } from './scoreReducers';
import { putDownPiece, resetWell, stepDown, moveLeft, moveRight, rotate, drop } from './wellReducers';
import AbstractWell from '../AbstractGame/AbstractWell';

const DEFAULT_STATE = {
	firstGame: true,
	well: {},
	nextPiece: {},
	currentPiece: {},
	score: 0,
	gameOver: false,
}

const startFirstGame = (state) =>
	resetScore(Object.assign({}, state, { firstGame: false }));

const rootReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		default:
			return state;
		case START_FIRST_GAME:
			return startFirstGame(state);
		case INCREASE_SCORE:
			return increaseScore(state, action);
		case RESET_SCORE:
			return resetScore(state);
		case WELL_PUTDOWN:
			return putDownPiece(state, action);
		case WELL_RESET:
			return resetWell(state, action);
		case STEP_DOWN:
			return stepDown(state, action);
		case MOVE_LEFT:
			return moveLeft(state, action);
		case MOVE_RIGHT:
			return moveRight(state, action);
		case ROTATE:
			return rotate(state, action);
		case DROP:
			return drop(state);
	}
}

export default rootReducer;
