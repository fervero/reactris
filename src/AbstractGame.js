import { AbstractPiece } from './AbstractPiece';
import { AbstractWell } from './AbstractWell';

class Game {
	constructor(width) {
		this.well = new AbstractWell(width);
		this.currentPiece = new AbstractPiece();
		this.nextPiece = new AbstractPiece();
	}
	nextPiece = function () {
		[this.currentPiece, this.nextPiece] = [this.nextPiece, new AbstractPiece()];
	}
}

export { Game };
