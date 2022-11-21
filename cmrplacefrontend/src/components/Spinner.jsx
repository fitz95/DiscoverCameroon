import React from 'react';
import {Vortex} from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Vortex
        visible={true}
        ariaLabel = 'vortex-loading'
        colors={[ 'green','red', 'yellow', 'green', 'red', 'yellow']}
        height={60}
        width={60}
        className="m-5"
        wrapperClass='m-5'
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;