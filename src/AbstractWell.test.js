import { AbstractWell } from './AbstractWell';
import { AbstractPiece } from './AbstractPiece';

it("Creates a default well 10 spaces wide and 22 spaces deep", () => {
   const well = new AbstractWell();
   expect(well.depth).toEqual(22);
   expect(well.width).toEqual(10);
});

it("Creates a default well with all free spaces", () => {
   const well = new AbstractWell();
   let allFree = true;
   for (let x = 0; x < well.width; x++) {
      for (let y = 0; y < well.depth; y++) {
         allFree = allFree && well.isFree(x,y);
      }
   }
   expect(allFree).toBeTruthy();
});

it("Out of bounds spaces are not free", () => {
   const well = new AbstractWell();
   expect(well.isFree(-1, -1)).toBeFalsy();
   expect(well.isFree(0, -1)).toBeFalsy();
   expect(well.isFree(-1, 0)).toBeFalsy();
   expect(well.isFree(0, well.depth)).toBeFalsy();
   expect(well.isFree(well.width, 0)).toBeFalsy();
});

it("A new piece doesn't cause collision", () => {
   const well = new AbstractWell();
   const piece = new AbstractPiece();
   expect(well.collision(piece)).toBeFalsy();
});

it("An out of bound piece causes collision", () => {
   const well = new AbstractWell();
   const piece = new AbstractPiece();
   const pieceRight = piece.moveRight(10);
   const pieceLeft = piece.moveLeft(10);
   expect(well.collision(pieceRight)).toBeTruthy();
   expect(well.collision(pieceLeft)).toBeTruthy();
});

it("Piece put on an already occupied place causes collision", () => {
   const well = new AbstractWell();
   const piece = new AbstractPiece("O");
   const anotherPiece = new AbstractPiece("O");
   well.putDown(piece);
   expect(well.collision(anotherPiece)).toBeTruthy();
});