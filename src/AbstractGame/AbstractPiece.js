import { arrayCopy } from '../utils';

const defaultPosition = [0, 0];
const pieceTypes = [
   { type: "S", blocks: [[-1, 1], [0, 1], [0, 0], [1, 0]], },
   { type: "T", blocks: [[-1, 1], [0, 1], [1, 1], [0, 0]], },
   { type: "Z", blocks: [[-1, 0], [0, 1], [0, 0], [1, 1]], },
   { type: "I", blocks: [[-2, 0], [-1, 0], [0, 0], [1, 0]], },
   { type: "L", blocks: [[-1, 1], [0, 1], [1, 1], [1, 0]], },
   { type: "R", blocks: [[-1, 1], [0, 1], [-1, 0], [1, 1]], },
   { type: "O", blocks: [[-1, 0], [0, 0], [-1, 1], [0, 1]], }
];

const randomPiece = () => {
   const index = Math.floor(Math.random() * pieceTypes.length);
   return pieceTypes[index];
}

class AbstractPiece {
   /**
    * 
    * @param {string} type 
    * @param {array} position 
    */
   constructor(type = '', position = [...defaultPosition]) {
      const piece = pieceTypes.find((x) => x.type === type.toUpperCase());
      this.blocks = piece ? piece.blocks : this.randomPiece().blocks;
      this.position = position;
   }
   clone = function () {
      const newBrick = new AbstractPiece();
      newBrick.position = arrayCopy(this.position);
      newBrick.blocks = arrayCopy(this.blocks);
      return newBrick;
   }
   getBlocks = function () {
      return arrayCopy(this.blocks);
   }
   setPosition = function(position) {
      const newPiece = new AbstractPiece('', position);
      newPiece.blocks = arrayCopy(this.blocks);
      return newPiece;
   }
   /**
    * Returns array of basic blocks in the outside world's coordinates.
    */
   getAbsoluteXY = function () {
      return (this.blocks).map(
         ([x, y]) => ([x + this.position[0], y + this.position[1]])
      )
   }
   getX = function () {
      return this.position[0];
   }
   getY = function () {
      return this.position[1];
   }
   isIdentical = (otherBrick) =>
      (
         (JSON.stringify(this.position) === JSON.stringify(otherBrick.position)) &&
         (JSON.stringify(this.blocks) === JSON.stringify(otherBrick.blocks))
      );

   /**
    * Rotates piece 90 degrees (or n times that) clockwise.
    */
   rotate = function (times = 1) {
      const rotated = this.clone();
      for (let i = 0; i < times; i++) {
         rotated.blocks = rotated.blocks.map(
            ([x, y]) => [y, 0 - x]
         )
      }
      return rotated;
   };
   moveLeft = function (spaces = 1) {
      const newBrick = this.clone();
      newBrick.position[0] = this.position[0] - spaces;
      return newBrick;
   }
   moveRight = function (spaces = 1) {
      return this.moveLeft(-spaces);
   }
   moveDown = function (spaces = 1) {
      const newBrick = this.clone();
      newBrick.position[1] = this.position[1] + spaces;
      return newBrick;
   }

   randomPiece = randomPiece;
}

export { AbstractPiece, pieceTypes };
