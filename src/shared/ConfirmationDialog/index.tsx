// Modal.js
import React from 'react';

const Modal = ({ show, onClose, onConfirm }: any) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p className="confirmation-message">
          Are you sure you want to cancel this order? This action cannot be
          undone.
        </p>
        <div className="confirmation-buttons">
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Cancel My Order
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
