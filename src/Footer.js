import React from 'react';
import './Well.css';
import './Footer.css';
import { ActionButton } from './ActionButton';

function Footer(props) {
   return (
      <div className='footer'>
         <ActionButton action={props.left} description="A" />
         <ActionButton action={props.rotate} description="S" />
         <ActionButton action={props.right} description="D" />
      </div>
   );
}

export { Footer };
