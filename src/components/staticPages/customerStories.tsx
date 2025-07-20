import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import BreadCrumbs from '../../shared/breadcrumbs';
// import ProgressiveImage from '../../shared/progressive-image';

const Testimonials = ({ data }: any) => {
  return (
    <>
      {' '}
      <BreadCrumbs />
      <section className="my-5">
        <div className="container">
          <div className="section-heading text-center mt-5">
            <h2>Customer Stories</h2>
            <p className="text-16 weight-500 mb-0 mt-4 mx-lg-5 px-lg-5">
              Discover the experiences of our valued customers through their
              stories of transformation and satisfaction with Harvin furniture.
              Dive into a world of inspiration and joy.
            </p>
          </div>
          <div className="testi-listing mt-4">
            {data?.map((media: any) => (
              <div key={media.id} className="testi-item">
                <i className="fa-solid fa-quote-left mb-2"></i>
                {ReactHtmlParser(media?.content)}
                <h3>{media.author_name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
