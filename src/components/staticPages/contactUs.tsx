import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import BreadCrumbs from '../../shared/breadcrumbs';

const ContactUs = ({ data }: any) => {
  const { content } = data.media;

  return (
    <>
      <BreadCrumbs />
      <section className="product-listing-title">
        <div className="container">
          <div className="section-heading text-center mb-5">
            {/* <h2>{meta_title}</h2> */}
          </div>
          <div className="about-content">{ReactHtmlParser(content)}</div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
