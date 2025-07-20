import Image from 'next/image';
import React from 'react';

const Item = ({ item, handleCheckboxChange, isChecked, obj }: any) => {
  return (
    <li
      key={item?.value}
      className={`${(obj?.count || 0) === 0 ? 'disabled-view' : ''}`}
    >
      <label className="dropdown-item">
        <input
          type="checkbox"
          id=""
          checked={isChecked && isChecked}
          name="sort"
          value=""
          className="filter-checkbox"
          onChange={(e) => handleCheckboxChange(e, item, 'attributes')}
        />
        {item?.fabric_image && (
          <Image
            alt={item?.value}
            style={{ borderRadius: '50%', marginRight: '10px' }}
            src={item?.fabric_image?.original}
            width={20}
            height={20}
          />
        )}
        {item?.value}
      </label>
      <span className="filter-count">({obj?.count || 0})</span>
    </li>
  );
};

export default Item;
