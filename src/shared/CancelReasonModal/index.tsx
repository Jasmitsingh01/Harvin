// CancelReasonModal.js
// import React from 'react';
// import Modal from 'react-modal';

// const CancelReasonModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   orderId,
//   reason,
//   setReason,
// }: any) => {
//   //   const [reason, setReason] = useState('');

//   const handleReasonChange = (e) => {
//     setReason(e.target.value);
//   };

//   console.log('orderId', orderId);

//   //   const handleSubmit = () => {
//   //     onSubmit(reason,orderId);
//   //   };
//   const handleSubmit = async () => {
//     await onSubmit(reason, orderId);
//   };
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={{
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.1)',
//           zIndex: 9999,
//         },
//         content: {
//           // Add any custom styles for the modal content here
//         },
//       }}
//       className="modal-contenteqnuire"
//     >
//       <div
//         id="select-bank"
//         aria-labelledby="exampleModalLabel"
//         style={{ display: 'block' }}
//       >
//         <div className="modal-dialog show">
//           <div className="modal-content">
//             <form autoComplete="off" className="login-form" noValidate>
//               <h3 className="text-24 weight-600">Reason for Cancellation</h3>
//               <textarea
//                 className="form-control"
//                 rows={4}
//                 placeholder="Reason for cancellation (Optional)"
//                 value={reason}
//                 onChange={handleReasonChange}
//               ></textarea>
//               <div className="confirmation-buttons mt-5">
//                 <button
//                   className="btn btn-theme d-inline-block w-auto px-5"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//                 {/* <button className="btn btn-secondary" onClick={onClose}>Cancel</button> */}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CancelReasonModal;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CancelReasonModal = ({
  isOpen,
  onClose,
  onSubmit,
  orderId,
  reason,
  setReason,
}: any) => {
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    await onSubmit(reason, orderId);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reason for Cancellation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off" className="login-form" noValidate>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Reason for cancellation (Optional)"
            value={reason}
            onChange={handleReasonChange}
          ></textarea>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          style={{ border: 'none' }}
          className="btn btn-theme d-inline-block w-auto px-5"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelReasonModal;
