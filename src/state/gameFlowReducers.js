import DEFAULT_INTERVAL from '../utils';
import { resetWell } from './wellReducers';
import {	resetScore } from './scoreReducers';
import { stepDown } from './moveReducers';

const newGame = (state) => {
	const newState = resetScore(Object.assign({}, state, { firstGame: false, gameOver: false }));
	const widthAction = { val: state.width };
	return resetWell(newState, widthAction);
}



export { newGame }

/*
	newGame = () => {
		clearInterval(this.state.gameLoopId);
		const gameLoopId = setInterval(this.gameStep, DEFAULT_INTERVAL);
		this.updateState(this.initialState(this.state.width), { gameLoopId });
		this.bindKeyboard();
		this.props.dispatch(newGame());
	}
*/