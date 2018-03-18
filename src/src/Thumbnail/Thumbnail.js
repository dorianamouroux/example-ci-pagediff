import React from 'react';

import './Thumbnail.css'


const Thumbnail = ({ diffSrc, oldSrc, newSrc, focusPage }) => {
  return (
    <div
      className="thumbnail"
      onClick={() => focusPage({diffSrc,oldSrc,newSrc})}>
        <img src={diffSrc} alt="thumbnail page change" />
        {diffSrc}
    </div>
  )
}

export default Thumbnail;
