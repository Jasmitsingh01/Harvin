import React from 'react';
import { CategoryType } from '../../interface/common';

const ListHeader = ({ category }: CategoryType | any) => {
  return (
    <section className="product-listing-title">
      <div className="container">
        <div className="section-heading text-center">
          <h2>{category?.name}</h2>
          <p className="text-16 weight-500 mb-0 mt-4 mx-lg-5 px-lg-5">
            {category?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ListHeader;
