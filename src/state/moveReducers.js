import {
	getNextPiece,
} from './wellReducers';

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
	while (!well.collision(movedPiece.moveDown())) {
		movedPiece = movedPiece.moveDown();
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

export {
	stepDown,
	moveLeft,
	moveRight,
	rotate,
	drop,
}
