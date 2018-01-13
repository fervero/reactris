import React from 'react';
import './Preview.css';
import { Brick } from '../Brick/Brick';

function Preview(props) {
   const piece = props.piece;
   const drawBrick = ([coordX, coordY, id], i) =>
      (<Brick
         height="50"
         width="25"
         x={coordX}
         y={coordY}
         key={"l" + i}
         styling="brick_preview"
      />);

   return (
      <div className='preview'>
         {piece.map(drawBrick)}
      </div>
   );
}

export { Preview };
