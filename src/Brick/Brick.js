import React, { Component } from 'react';
import './Brick.css';

class Brick extends Component {
   constructor(props) {
      super(props);
      const shake = props.dead ?
         { transform: "rotate(" + (Math.round((Math.random() * 18 - 9))) + "deg)" } : {};
      this.background_position =
         (Math.random() * 80 + 10).toFixed(2) + "% " +
         (Math.random() * 80 + 10).toFixed(2) + "%";
      this.state = {
         shake,
         dead: false,
      }
   }

   render() {
      const style = Object.assign(
         {
            top: (this.props.y - 2) * this.props.height + "%",
            left: this.props.x * this.props.width + "%",
            backgroundPosition: this.background_position
         },
         this.state.shake
      );
      return (
         <div
            className={"brick " + this.props.styling}
            style={style}>
         </div>
      );
   }
}

export default Brick;
