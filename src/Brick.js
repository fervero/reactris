import React, { Component } from 'react';
import './Brick.css';

function Brick(props) {
   return (
      <div
         className={"brick " + ( props.dead ? "brick_dead" : "") }
         style={{ top: props.y * 24, left: props.x * 24 }}>
      </div>
   );
}

export { Brick };
