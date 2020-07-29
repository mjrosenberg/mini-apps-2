import React from 'react';

const Event = (props) => (
  <div className='event'>
    <div className='date'>Date: {props.event.date}</div>
    <div className='description'>Description: {props.event.description}</div>
    {/* <div className='lang'>Language: {props.event.lang}</div>
    <div className='category_one'>{props.event.category1}</div> */}
    {/* <div className='category_two'>{props.event.category2 || ''}</div> */}
  </div>
)

export default Event;