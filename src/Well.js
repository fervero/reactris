import React from 'react';
import './Well.css';
import { Brick } from './Brick';

function Well(props) {
   const piece = props.piece;
   const width = props.well.width;
   const depth = props.well.depth;
   const deadBricks = props.well.getDeadBricks();

   const drawBrick = ([coordX, coordY, id], i) =>
      (<Brick x={coordX} y={coordY} key={"l" + i} />);
   const drawDeadBrick = ([coordX, coordY, id], i) =>
      (<Brick dead="true" x={coordX} y={coordY} key={"f"+id} />);

   return (
      <div className='well' style={{ width: width * 24, height: depth * 24 }}>
         {piece.map(drawBrick)}
         {deadBricks.map(drawDeadBrick)}
      </div>
   );
}

export { Well };
