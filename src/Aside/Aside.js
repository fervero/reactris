import React from 'react';
import './Aside.css';
import { ActionButton } from '../ActionButton/ActionButton';
import { Preview } from '../Preview/Preview';

function Aside(props) {
   return (
      <div className='panel panel_aside'>
         <div className="heading">Next:</div>
         <Preview piece={props.next} />
         <div className="heading">Score:</div>
         <div className="score_box">{props.score}</div>
         <ActionButton action={props.newGame} description="Play!" />
      </div>
   );
}


export { Aside };
