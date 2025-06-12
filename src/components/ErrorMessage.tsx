import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-red-500 p-4">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage; 