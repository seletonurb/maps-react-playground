import React from 'react';
import Header from './Header';
import CustomToast from '../containers/CustomToast';

const OuterLayout = ({ children }) => {
  const containerClassname = 'main-container padding-top-navbar';

  return (
    <div id="main" className="app-container">
      <CustomToast />
      <div>
        <Header />
      </div>
      <div className={containerClassname} autoscroll="true">
        {children}
      </div>
    </div>
  );
};

export default OuterLayout;
