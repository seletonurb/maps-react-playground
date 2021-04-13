import React from 'react';

const ShowError = ({ error }) => {
  if (!error) {
    return null;
  }

  return <p className="error-messages">{error.message}</p>;
};

export default ShowError;
