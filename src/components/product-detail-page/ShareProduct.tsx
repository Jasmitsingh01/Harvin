import React from 'react';
import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from 'react-share';
import facebookic from '../../assets/images/facebook-icon.png';
import whatsapp from '../../assets/images/whatsapp.png';
import pinterest from '../../assets/images/pinterest.png';
// import instagram from '../../assets/images/instagram.png';
import emailic from '../../assets/images/Email_icon.png';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import twitteric from '../../assets/images/twitter-icon.png';
import { useState } from 'react';

const ShareProduct = ({ show, handleClose, product }: any) => {
  const [copied, setCopied] = useState(false);
  let url = null;
  if (window.location) {
    url = window.location.href;
  }
  return (
    <Modal show={show} onHide={handleClose} className="share-product-pop-up">
      <Modal.Header closeButton>
        <h1 className="modal-title text-18 weight-600" id="exampleModalLabel">
          <i className="fa-sharp fa-light fa-share-nodes"></i>Share this product
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className="share-product-link-wrap">
          <input
            type="text"
            value={url}
            name=""
            id=""
            className="form-control"
            placeholder="https://www.harvinchairs.com/product/luxury-comfort-chair"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              setCopied(true);
            }}
            className="btn share-link-btn weight-600"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <div className="share-link-icon-wrap d-flex align-items-center">
          <p className="weight-600 mb-0">Share to :</p>
          <div className="share-icon d-flex">
            {typeof window !== 'undefined' && (
              <EmailShareButton
                url={window.location.href}
                subject="Check out this link"
              >
                <Image src={emailic} alt="Email" />
              </EmailShareButton>
            )}
            {typeof window !== 'undefined' && (
              <TwitterShareButton url={window.location.href}>
                <Image src={twitteric} alt="Twitter" />
              </TwitterShareButton>
            )}
            {typeof window !== 'undefined' && (
              <FacebookShareButton url={window.location.href}>
                <Image src={facebookic} alt="Facebook" />
              </FacebookShareButton>
            )}
            {typeof window !== 'undefined' && (
              <WhatsappShareButton url={window.location.href}>
                <Image src={whatsapp} alt="WhatsApp" />
              </WhatsappShareButton>
            )}
            {typeof window !== 'undefined' && (
              <PinterestShareButton
                url={window.location.href}
                media={
                  product?.images
                    ? product?.images[0].original
                    : product?.gallery[0].original
                }
                description={`${product?.name}: ${product?.description}`}
              >
                <Image
                  src={pinterest}
                  alt="vector18"
                  title="Pinterest"

                  //   onClick={handlePinterestShare}
                />
              </PinterestShareButton>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareProduct;
