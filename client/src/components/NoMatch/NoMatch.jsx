import React from 'react';

function NoMatch({ text }) {
  return (
    <div className="text-white text-[50px] w-full flex items-center justify-center p-6 text-center">
      {text}
    </div>
  );
}

export default NoMatch;