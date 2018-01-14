import React from 'react';
import { connect } from 'react-redux';
import './Aside.css';
import ActionButton from '../ActionButton/ActionButton';
import Preview from '../Preview/Preview';

function Aside(props) {
   return (
      <div className='panel panel_aside'>
         <div className="heading">Next:</div>
         <Preview piece={props.next} />
         <div className="heading">Score:</div>
         <div className="score_box">{props.score}</div>
         <ActionButton action={props.newGame} attention={props.firstGame} description="Play!" />
      </div>
   );
}

const mapStateToProps = (state) => ({
   firstGame: state.firstGame
});

export default connect(mapStateToProps)(Aside);
