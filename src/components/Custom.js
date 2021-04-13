import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export const Button = ({ as = 'button', ...props }) => React.createElement(as, props);

export const CustomTooltip = ({ children, text }) => {

  return (
    <OverlayTrigger
      overlay={
        <Tooltip placement="top" delay={{ show: 150, hide: 200 }}>
          {text}
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
};
