import AbstractPiece, { pieceTypes } from './AbstractPiece';

const asymmetricalPieces = pieceTypes.filter((x) => (x.type !== "O"));

it('Creates a 4-block piece', () => {
   let brick;
   for (let piece of pieceTypes) {
      brick = new AbstractPiece(piece.type);
      expect(brick).toHaveProperty('blocks');
      expect(brick.blocks).toHaveLength(4);
   }
});

it('Clones exactly', () => {
   let brick, clonedBrick;
   for (let piece of pieceTypes) {
      brick = new AbstractPiece();
      clonedBrick = brick.clone();
      expect(brick.isIdentical(clonedBrick)).toBeTruthy();
   }
});

it('S and Z are different', () => {
   const s = new AbstractPiece('S');
   const z = new AbstractPiece('Z');
   expect(s.isIdentical(z)).toBeFalsy();
});

it('360-degree rotation is identity', () => {
   let brick, rotatedBrick;
   for (let piece of pieceTypes) {
      brick = new AbstractPiece(piece.type);
      rotatedBrick = brick.rotate(4);
      expect(brick.isIdentical(rotatedBrick)).toBeTruthy();
   }
});

it('90-degree rotation is not identity', () => {
   let brick, rotatedBrick;
   for (let piece of asymmetricalPieces) {
      brick = new AbstractPiece(piece.type);
      rotatedBrick = brick.rotate(1);
      expect(brick.isIdentical(rotatedBrick)).toBeFalsy();
   }
});

it('Moves right one space', () => {
   const brick = new AbstractPiece();
   const movedBrick = brick.moveRight(1);
   expect(brick.getX() - movedBrick.getX()).toEqual(-1);
})

it('Correctly adds position vector to the piece\'s bricks', () => {
   const brick = new AbstractPiece('I', [5, 5]);
   const absolute = brick.getAbsoluteXY();
   expect(absolute).toEqual([[3, 5], [4, 5], [5, 5], [6, 5]]);
});
