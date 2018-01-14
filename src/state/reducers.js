import { START_FIRST_GAME } from './actions';

const DEFAULT_STATE = {
	firstGame: true,
	well: {},
	nextPiece: {},
	currentPiece: {},
	score: 0,
	gameLoopId: 0,
	paused: false,
	gameOver: false
}

const startFirstGame = (state, action) => 
	Object.assign({}, state, {firstGame: false});


const rootReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		default:
			return state;
		case START_FIRST_GAME:
			return startFirstGame(state);
	}
}

export default rootReducer;
