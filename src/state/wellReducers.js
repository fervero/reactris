import { resetScore, increaseScore } from './scoreReducers';
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
	const newState = putDownPiece(state, {val: state.currentPiece});
	const well = newState.well.putDown(state.currentPiece);
	const currentPiece = well.pickUp(state.nextPiece);
	const nextPiece = new AbstractPiece();
	return Object.assign({}, newState, { well, currentPiece, nextPiece });
}

const stepDown = (state, action) => {
	const piece = state.currentPiece;
	const movedPiece = piece.moveDown();
	return (state.well.collision(movedPiece)) ?
		getNextPiece(state) :
		Object.assign({}, state, { currentPiece: movedPiece });
}

const drop = (state) => {
	const well = state.well;
	let movedPiece = state.currentPiece;
	let temp;
	while (!well.collision(temp = movedPiece.moveDown())) {
		movedPiece = temp;
	}
	return checkAndUpdatePiece(state, movedPiece);	
}

const checkAndUpdatePiece = (state, piece) =>
	(state.well.collision(piece)) ?
		state :
		Object.assign(state, { currentPiece: piece });

const moveLeft = (state, action) => {
	const piece = state.currentPiece.moveLeft(1);
	return checkAndUpdatePiece(state, piece);
}

const moveRight = (state, action) => {
	const piece = state.currentPiece.moveRight(1);
	return checkAndUpdatePiece(state, piece);
}

const rotate = (state, action) => {
	const piece = state.currentPiece.rotate(1);
	return checkAndUpdatePiece(state, piece);
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
	putDownPiece,
	pickUpPiece,
	resetWell,
	stepDown,
	moveLeft,
	moveRight,
	rotate,
	drop,
}
