import React, { useState } from 'react';

import sbi from '../../../../assets/images/sbi-logo.png';
import kotak from '../../../../assets/images/kotak-logo.png';

import icici from '../../../../assets/images/icici-logo.png';
import yes from '../../../../assets/images/yes-logo.png';

import axis from '../../../../assets/images/axis-logo.png';
import hdfc from '../../../../assets//images/hdfc-logo.png';
import ProgressiveImage from '../../../../shared/progressive-image';
import Modal from 'react-modal';

const NetBanking = ({ activeAccordion }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  // useEffect(()=>{

  // },[isModalOpen])

  return (
    <div
      id="netbanking-option"
      className={`accordion-collapse  ${
        activeAccordion === 'Netbanking' ? '' : 'collapse'
      }`}
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        <div className="netbanking-open">
          <div className="bank-card-listing">
            <div className="bank-card active">
              <ProgressiveImage src={sbi} alt="" />
              <span>SBI</span>
            </div>
            <div className="bank-card">
              <ProgressiveImage src={kotak} alt="" />
              <span>KOTAK</span>
            </div>
            <div className="bank-card">
              <ProgressiveImage src={icici} alt="" />
              <span>ICICI</span>
            </div>
            <div className="bank-card">
              <ProgressiveImage src={yes} alt="" />
              <span>YES</span>
            </div>
            <div className="bank-card">
              <ProgressiveImage src={axis} alt="" />
              <span>AXIS</span>
            </div>
            <div className="bank-card">
              <ProgressiveImage src={hdfc} alt="" />
              <span>HDFC</span>
            </div>
          </div>
          <button
            onClick={handleModalToggle}
            type="button"
            className="btn btn-primary select-bank"
            data-bs-toggle="modal"
            data-bs-target="#select-bank"
          >
            Select A Different Bank
          </button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleModalToggle}
            // contentLabel="All Banks"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              content: {
                width: '30%',
                maxHeight: '20%',
                padding: '20px',
                margin: 'auto', // Center horizontally
                overflow: 'auto',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                //   width:"200px",
                borderRadius: '8px',
              },
            }}
          >
            <div
              className={`modal  ${isModalOpen ? 'show' : ''}`}
              id="select-bank"
              aria-labelledby="exampleModalLabel"
              style={{ display: 'block' }}
            >
              <div className="modal-dialog show">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title text-20 weight-600"
                      id="exampleModalLabel"
                    >
                      All Banks
                    </h1>
                    <button
                      onClick={handleModalToggle}
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <ul className="bank-name-list">
                      <li>
                        <a href="" className="bank-name-link">
                          <ProgressiveImage src={sbi} alt="" />
                          SBI State Bank
                        </a>
                      </li>
                      <li>
                        <a href="" className="bank-name-link">
                          <ProgressiveImage src={sbi} alt="" />
                          ICICI Bank
                        </a>
                      </li>
                      <li>
                        <a href="" className="bank-name-link">
                          <ProgressiveImage src={sbi} alt="" />
                          Axis Bank Limited
                        </a>
                      </li>
                      <li>
                        <a href="" className="bank-name-link">
                          <ProgressiveImage src={sbi} alt="" />
                          Yes Bank
                        </a>
                      </li>
                      <li>
                        <a href="" className="bank-name-link">
                          <ProgressiveImage src={sbi} alt="" />
                          HDFC Bank
                        </a>
                      </li>
                      <li>
                        <a href="" className="bank-name-link">
                          <ProgressiveImage src={sbi} alt="" />
                          Kotak Mahindra Bank Limited
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <button className="btn btn-theme pay-now-btn">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default NetBanking;
