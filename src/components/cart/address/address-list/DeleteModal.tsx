import React from 'react';
import { getAddressId } from '../../../../stores/cart/cart-store';
import {
  deleteAddress,
  setDeleteId,
} from '../../../../stores/cart/cart-action';
const DeleteModal = () => {
  const { deleteAddressId, deleteAddressLoading } = getAddressId();
  const closeModal = () => {
    setDeleteId(null);
  };
  const handleConfirmDelete = () => {
    if (deleteAddressId) {
      deleteAddress(deleteAddressId);
    }
  };
  return (
    <div>
      {deleteAddressId && (
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete Address
                </h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this address?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  {deleteAddressLoading ? 'Loading...' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
