import { arrayCopy } from './utils';

class AbstractWell {
	/**
	 * 
	 * @param {number} width 
	 */
	constructor(width = 10) {
		this.width = width;
		this.depth = width * 2 + 2;
		this.fields = Array(this.depth);
		this.fields.fill(Array(this.width).fill(1));
	}

	getDeadBricks = function () {
		const deadBricks = [];
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.depth; y++) {
				if (!this.isFree(x, y)) {
					deadBricks.push([x, y]);
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
			this.fields[y][x];
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	writeSpace = function (x, y) {
		this.fields[y][x] = 0;
	}

	collision = function (piece) {
		const absoluteXY = piece.getAbsoluteXY();
		const noCollision = absoluteXY.reduce(
			(acc, [x, y]) => (this.isFree(x, y) && acc),
			true);
		return !noCollision;
	}

	putDown = function (piece) {
		const absoluteXY = piece.getAbsoluteXY();
		const newWell = new AbstractWell(this.width);
		newWell.fields = arrayCopy(this.fields);
		absoluteXY.forEach(([x, y]) => newWell.writeSpace(x, y));
		return newWell;
	}

	isOccupiedField = (acc, v) => (acc && !v);

	isNotFullLine = (arr) => !arr.reduce(this.isOccupiedField, true);

	newRow = (width) => Array(this.width).fill(1);

	/**
	 * Finds full lines, deletes if any, tops up with empty rows if necessary,
	 * returns a number and a new well.
	 */
	prun = function () {
		const fields = this.fields.filter(this.isNotFullLine);
		const fullLines = this.depth - fields.length;
		if(fullLines === this.depth) {
			return {
				number: 0,
				well: this,
			}
		}
		const newWell = new AbstractWell(this.width);
		for(let i = 0, len = this.depth - fields.length; i < len; i++) {
			fields.unshift(this.newRow(this.width));
		}
		newWell.fields = fields;
		return {
			number: fullLines,
			well: newWell,
		}
	}
}

export { AbstractWell }
