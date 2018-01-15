import React from 'react';
import { connect } from 'react-redux';
import './Well.css';
import Brick from '../Brick/Brick';

function Well(props) {
   const piece = props.piece.getAbsoluteXY();
   const width = 100 / props.well.width;
   const height = width / 2;
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
         {props.firstGame ? null : piece.map(drawBrick)}
         {deadBricks.map(drawDeadBrick)}
      </div>
   );
}

const mapStateToProps = (state) => {
   return ({
   firstGame: state.firstGame,
   well: state.well,
   piece: state.currentPiece,
})};

export default connect(mapStateToProps)(Well);
