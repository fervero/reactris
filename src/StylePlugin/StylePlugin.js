import React from 'react';

function StylePlugin(props) {
   const width = (100 / props.width).toFixed(4) + "%";
   const height = (50 / props.width).toFixed(4) + "%";

   return (
      <style dangerouslySetInnerHTML={{
         __html: `
            .brick { 
               width: ${width}; 
               height: ${height} 
            }`
      }} />
   );
}

export { StylePlugin };
