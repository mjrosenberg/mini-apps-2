import React from 'react';

const Frame = (props) => {
  return(
    <div className='frame' id={`frame${props.frameNum}`}>
      Frame {props.frameNum}
      <div className='firstThrow' id={`firstThrow${props.frameNum}`}></div>
      <div className='secondThrow' id={`secondThrow${props.frameNum}`}></div>
      <div className='thirdThrow' id={`thirdThrow${props.frameNum}`}></div>
      <div className='totScore' id={`totScore${props.frameNum}`}></div>
    </div>
  );
}

export default Frame;