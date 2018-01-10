import React, { Component } from 'react';
import './Aside.css';
import { Brick } from './Brick';
import { ActionButton } from './ActionButton';
import { Preview } from './Preview';

function Aside(props) {
   return (
      <div className='aside'>
         <div className="heading">Next:</div>
         <Preview piece={props.next} />
         <div className="heading">Score:</div>
         <div>{props.score}</div>
         <ActionButton action={props.newGame} description="Play!" />
      </div>
   );
}


export { Aside };
