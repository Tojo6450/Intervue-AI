import React from 'react';

const SpinnerLoader = () => {
  return (
    <div role="status" className="flex justify-center items-center">
      <svg
        aria-hidden="true"
        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5C100 78.3 77.6 100.7 49.9 100.7 22.2 100.7 0 78.3 0 50.5 0 22.7 22.2 0.3 49.9 0.3 77.6 0.3 100 22.7 100 50.5ZM9.1 50.5c0 22.6 18.3 40.9 40.8 40.9s40.8-18.3 40.8-40.9S72.5 9.6 49.9 9.6 9.1 27.9 9.1 50.5Z"
          fill="currentColor"
        />
        <path
          d="M93.9 39.1c2.3-.5 3.7-2.8 3.2-5.1-3.8-17.3-19.3-30-37.4-30H50v9.7h9.7c13.2 0 24.6 8.8 28 21.4.5 2.3 2.8 3.7 5.1 3.2Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
