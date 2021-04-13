import React from 'react';

const InProgress = ({ inProgress }) => {
  if (inProgress) {
    return <i className="fa fa-spinner fa-spin"></i>;
  }
  return null;
};

export default InProgress;
