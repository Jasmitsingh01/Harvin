import Link from 'next/link';
import React, { useState } from 'react';

import Input from '../../shared/fields/Input';
import BreadCrumbs from '../../shared/breadcrumbs';

const Stories = ({ data }: any) => {
  const [filter, setFilter] = useState('');

  const filteredData = data?.stores?.filter((media: any) => {
    const filterLowerCase = filter.toLowerCase();
    const cityMatch = media.city.toLowerCase().includes(filterLowerCase);
    const pincodeMatch = media.pincode.includes(filter);

    return cityMatch || pincodeMatch;
  });

  return (
    <>
      <BreadCrumbs />
      <section className="my-5">
        <div className="container">
          <div className="section-heading text-center mt-5">
            <h2>Our Stores</h2>
            <p className="text-16 weight-500 mb-0 mt-4 mx-lg-5 px-lg-5">
              Explore Harvin Furnitures curated stores for timeless designs and
              unparalleled comfort. Elevate your space with our exquisite
              collections. Visit us today!
            </p>
          </div>
          <div className="mt-5 mb-4">
            <Input
              type="text"
              id="filter"
              name="filter"
              value={filter}
              className="form-control store-search"
              placeholder="Enter City or Pincode"
              onChange={(_, value) => setFilter(value)}
            />
          </div>

          {filteredData && filteredData.length > 0 ? (
            <div className="store-listing">
              {filteredData.map((media: any) => (
                <div key={media.id} className="store-item">
                  <Link href={`/our-stores/${media.id}`}>
                    <h3 className="mb-3 text-18 line-height-1-5">
                      {media.name}
                    </h3>
                  </Link>
                  <p className="text-theme">
                    <i className="fa-regular fa-location-dot"></i> {media.city}
                  </p>
                  <p>{media.address}</p>
                  {/* <p>{media.pincode}</p> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center my-5 py-5">No data found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Stories;
