import React from 'react';
import Item from './item';

const ListingData = ({
  elem,
  handleOpenClose,
  openTab,
  handleCheckboxChange,
  index,
  selectedAttributes,
  key,
  attributesCounts,
}: any) => {
  return (
    <div className="dropdown filter-dropdown" key={key}>
      <button
        onClick={() => handleOpenClose(index)}
        className={`btn btn-secondary dropdown-toggle  ${
          openTab === index && 'show'
        }`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {elem?.name}
      </button>
      <ul
        className={`dropdown-menu filter-dropdown-menu price-range-menu ${
          openTab === index ? 'show' : ''
        }`}
      >
        {elem?.values?.map((item: any) => {
          const arr = attributesCounts[elem.id];
          const obj = arr?.find(
            (c) => c.id === item.id && c.attribute_id === item.attribute_id
          );

          const isChecked = selectedAttributes.includes(parseInt(item.id));
          return (
            <Item
              key={item.id}
              item={item}
              handleCheckboxChange={handleCheckboxChange}
              isChecked={isChecked}
              obj={obj}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ListingData;
