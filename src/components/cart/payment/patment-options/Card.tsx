import React from 'react';
import ProgressiveImage from '../../../../shared/progressive-image';

const Card = ({ activeAccordion, cartcsv }: any) => {
  return (
    <div
      id="card-option"
      className={`accordion-collapse  ${
        activeAccordion === 'Card' ? '' : 'collapse'
      }`}
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        <div className="card-open">
          <div className="form-group">
            <input
              type="text"
              className="form-control card-input"
              name=""
              id=""
              placeholder="Card Number"
            />
            <input
              type="text"
              className="form-control num-input"
              name=""
              id=""
              placeholder="Expiry"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control card-input"
              name=""
              id=""
              placeholder="Card Holder's Name"
            />
            <div className="position-relative">
              <input
                type="text"
                className="form-control num-input"
                name=""
                id=""
                placeholder="CVV"
              />

              <button
                type="button"
                className="btn btn-primary info-icon-btn"
                data-bs-toggle="modal"
                data-bs-target="#cvv-info"
              >
                <i className="fa-light fa-circle-info info-icon"></i>
              </button>

              <div
                className="modal fade"
                id="cvv-info"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title text-20 weight-600"
                        id="exampleModalLabel"
                      >
                        What is CVV Number?
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="cvv-wrap">
                        <div className="cvv-info">
                          <p>It’s a 3-digit code on the back of your card</p>
                          <ProgressiveImage src={cartcsv} alt="" />
                        </div>
                        <div className="cvv-info">
                          <h4 className="text-16 weight-600">
                            Have American Express Card?
                          </h4>
                          <p>
                            It’s 4-digit number on the front, just above credit
                            card number.
                          </p>
                          <img src="assets/images/cvv-card-num.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-theme pay-now-btn">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
