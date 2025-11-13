import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-lg">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Generando tu lección...
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Esto puede tardar unos segundos.
      </p>
    </div>
  );
};

export default LoadingSpinner;
