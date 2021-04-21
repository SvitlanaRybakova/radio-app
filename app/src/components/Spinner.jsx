import React from 'react';
import spinner from '../assets/spinner.gif';

export default () => {
  return(
    <div>
      <img src={spinner} alt="Loading..."
      style={{ width: '200px', margin: '140px auto', display: 'block'}}/>
    </div>
  )
}