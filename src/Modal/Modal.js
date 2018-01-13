import React from 'react';
import './Modal.css';

function Modal(props) {
   return (
      <div className='modal' onClick={props.action}>
			<span>{props.message}</span>
      </div>
   );
}

export { Modal };
