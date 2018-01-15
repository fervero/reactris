import {
	NEW_GAME,
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
import { DEFAULT_WIDTH } from '../utils';
import {
	increaseScore,
	resetScore
} from './scoreReducers';
import {
	putDownPiece,
	resetWell,
} from './wellReducers';
import {
	stepDown,
	moveLeft,
	moveRight,
	rotate,
	drop,
} from './moveReducers';
import {
	newGame
} from './gameFlowReducers';


const DEFAULT_STATE = {
	firstGame: true,
	well: {},
	nextPiece: {},
	currentPiece: {},
	score: 0,
	gameLoopId: 0,
	gameOver: false,
	width: DEFAULT_WIDTH,
}

const rootReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		default:
			return state;
		case NEW_GAME:
			return newGame(state);
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
