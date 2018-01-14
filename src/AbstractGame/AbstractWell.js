import { arrayCopy } from '../utils';

class AbstractWell {
	/**
	 * 
	 * @param {number} width 
	 */
	constructor(width = 10) {
		this.width = width;
		this.depth = width * 2 + 2;
		this.fields = Array(this.depth);
		this.defaultPosition = [Math.ceil(width / 2), 2];
		this.fields.fill(this.newRow());
		this.idGen = this.uniqId();
	}

	nextWell = function() {
		return Object.assign(new AbstractWell(this.width), {idGen: this.idGen});
	}

	uniqId = function* () {
		let id = 0;
		while(true) {
			yield(++id);
		}
	}

	getDeadBricks = function () {
		const deadBricks = [];
		for (let y = this.depth - 1; y > -1; y--) {
			for (let x = 0; x < this.width; x++) {
				if (!this.isFree(x, y)) {
					deadBricks.push([x, y, this.fields[y][x]]);
				}
			}
		}
		return deadBricks;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	isFree = function (x, y) {
		return (x >= 0) &&
			(x < this.width) &&
			(y >= 0) &&
			(y < this.depth) &&
			!this.fields[y][x];
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	writeSpace = function (x, y, val = 1) {
		this.fields[y][x] = val;
	}

	collision = function (piece) {
		const absoluteXY = piece.getAbsoluteXY();
		const noCollision = absoluteXY.reduce(
			(acc, [x, y]) => (this.isFree(x, y) && acc),
			true);
		return !noCollision;
	}

	pickUp = function (piece) {
		const newPiece = piece.setPosition(this.defaultPosition);
		return newPiece;
	}

	putDown = function (piece) {
		const absoluteXY = piece.getAbsoluteXY();
		const newWell = this.nextWell();
		newWell.fields = arrayCopy(this.fields);
		absoluteXY.forEach(([x, y]) => newWell.writeSpace(x, y, this.idGen.next().value));
		return newWell;
	}

	isOccupiedField = (acc, v) => (acc && v);

	isNotFullLine = (arr) => !arr.reduce(this.isOccupiedField, true);

	newRow = (width) => Array(this.width).fill(0);

	/**
	 * Finds full lines, deletes if any, tops up with empty rows if necessary,
	 * returns a number and a new well.
	 */
	prune = function () {
		const fields = this.fields.filter(this.isNotFullLine);
		const fullLines = this.depth - fields.length;
		if (fullLines === this.depth) {
			return {
				number: 0,
				well: this,
			}
		}
		const newWell = this.nextWell();
		for (let i = 0, len = this.depth - fields.length; i < len; i++) {
			fields.unshift(this.newRow(this.width));
		}
		newWell.fields = fields;
		return {
			number: fullLines,
			well: newWell,
		}
	}
}

export default AbstractWell;
