import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { hideToastMessage } from '../actions/common';

const BootstrapToaster = ({
  toastHeader, message, messageType, showToast, hideToastMessage
}) => {
  const getClassName = messageType => {
    const classNamePrefix = 'toast-message';

    switch (messageType) {
      case 'success':
        return `${classNamePrefix} success`;
      case 'error':
        return `${classNamePrefix} danger`;
      case 'warning':
        return `${classNamePrefix} warning`;
      default:
        return `${classNamePrefix} primary`;
    }
  };

  return (
    <Toast show={showToast} delay={3000} onClose={() => hideToastMessage()} className={getClassName(messageType)} autohide>
      <Toast.Header>
        <strong className="mr-auto">{toastHeader}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

const CustomToast = ({ callbackMessage, hideToastMessage }) => {
  const [showToast, setShowToast] = useState(!!callbackMessage.message);

  useEffect(() => {
    setShowToast(!!callbackMessage.message);
  }, [callbackMessage]);

  const { message, mtype: messageType } = callbackMessage;
  const toastHeader = `${messageType.toUpperCase()}`;

  if (!showToast) {
    return null;
  }
  return (
    <BootstrapToaster show={showToast} toastHeader={toastHeader} message={message} messageType={messageType} hideToastMessage={hideToastMessage} />
  );
};

const mapStateToProps = state => ({
  callbackMessage: state.common.callbackMessage
});

const mapDispatchToProps = dispatch => ({
  hideToastMessage: () => dispatch(hideToastMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomToast);
