import React from 'react';

type Props = {};

const ForkBanner = (props: Props) => {
  return (
    <div className="fixed top-0 right-0 bg-[#00F] text-white w-[200px] m-2 text-sm flex justify-center items-center shadow-lg transform rotate-45 translate-x-14 translate-y-8 border-t border-white border-b ">
      <a href="https://github.com/aiberk/infoVizGroup8" target="_blank" rel="noopener noreferrer">
        Fork me on GitHub
      </a>
    </div>
  )
}

export default ForkBanner;
