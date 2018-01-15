import { resetWell } from './wellReducers';
import { resetScore } from './scoreReducers';

const newGame = (state) => {
	const newState = resetScore(Object.assign({}, state, { firstGame: false, gameOver: false }));
	const widthAction = { val: state.width };
	return resetWell(newState, widthAction);
}

const updatePauseAttribute = (state, action) =>
	Object.assign({}, state, { paused: action.val });

export { newGame, updatePauseAttribute }
