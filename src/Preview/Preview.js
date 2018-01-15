import React from 'react';
import { connect } from 'react-redux';
import './Preview.css';
import Brick from '../Brick/Brick';

function Preview(props) {
   const piece = props.nextPiece.setPosition([2,2]).getAbsoluteXY();
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
         {props.firstGame ? null : piece.map(drawBrick)}
      </div>
   );
}

const mapStateToProps = (state) => ({
   firstGame: state.firstGame,
   nextPiece: state.nextPiece,
});

export default connect(mapStateToProps)(Preview);
