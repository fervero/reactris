import { increaseScore } from './scoreReducers';
import AbstractWell from '../AbstractGame/AbstractWell';
import AbstractPiece from '../AbstractGame/AbstractPiece';

const checkFullLines = (state) => {
	const fullLines = state.well.prune();
	if (fullLines.number === 0) {
		return state;
	}
	const well = fullLines.well;
	const newState = Object.assign({}, state, { well });
	const updateScoreAction = ({ val: fullLines.number });
	return increaseScore(newState, updateScoreAction);
}

const putDownPiece = (state, action) => {
	const piece = action.val;
	const well = state.well.putDown(piece);
	return checkFullLines(Object.assign({}, state, { well }));
}

const pickUpPiece = (state, action) => {
	const piece = action.val;
	const currentPiece = state.well.pickUp(piece);
	return Object.assign({}, state, { currentPiece });
}

const getNextPiece = (state) => {
	if(state.gameOver) {
		return state;
	}
	const newState = putDownPiece(state, {val: state.currentPiece});
	const well = newState.well.putDown(state.currentPiece);
	const currentPiece = well.pickUp(state.nextPiece);
	const nextPiece = new AbstractPiece();
	const gameOver = newState.well.collision(currentPiece);
	return Object.assign({}, newState, { well, currentPiece, nextPiece, gameOver });
}

const resetWell = (state, action) => {
	const width = action.val;
	const well = new AbstractWell(width);
	const currentPiece = well.pickUp(new AbstractPiece());
	const nextPiece = new AbstractPiece();
	return Object.assign(
		{},
		state,
		{ well, currentPiece, nextPiece });
}

export {
	checkFullLines,
	putDownPiece,
	pickUpPiece,
	getNextPiece,
	resetWell,
}
