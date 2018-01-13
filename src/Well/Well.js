import React from 'react';
import './Well.css';
import { Brick } from '../Brick/Brick';

function Well(props) {
   const piece = props.piece;
   const width = 100/props.well.width;
   const height = width/2;
   const deadBricks = props.well.getDeadBricks();

   const brick = ([x, y]) =>
      ({
         height, width, x, y,
      });

   const drawBrick = ([coordX, coordY, id], i) =>
      (<Brick
         {...brick([coordX, coordY]) }
         key={"l" + i}
      />);

   const drawDeadBrick = ([coordX, coordY, id], i) =>
      (<Brick
         {...brick([coordX, coordY]) }
         dead="true"
         key={"f" + id}
         styling="brick_dead"
      />);

   return (
      <div className='well' onClick={props.pause}>
         {piece.map(drawBrick)}
         {deadBricks.map(drawDeadBrick)}
      </div>
   );
}

export { Well };
