import React from 'react';


const Thumbnail = ({ diffSrc, oldSrc, newSrc, focusPage }) => {
  return (
    <div
      className="thumbnail"
      onClick={() => focusPage({diffSrc,oldSrc,newSrc})}>
        <img src={diffSrc} alt="test" />
        {diffSrc}
    </div>
  )
}

export default Thumbnail;
