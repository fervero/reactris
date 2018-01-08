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

	putDown = function(piece) {
		const absoluteXY = piece.getAbsoluteXY();
		absoluteXY.forEach(([x, y]) => this.writeSpace(x, y) );
	}
}

export { AbstractWell }
