import React from 'react';
import Pagination from 'react-js-pagination';

const AccountPagination = ({
  currentPage,
  itemsPerPage,
  listLength,
  handlePageChange,
}: any) => {
  return (
    <div className="my-account-pagination">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={listLength || 0}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass={'page-item'}
        innerClass="pagination"
        activeClass="active"
        linkClass="page-link"
      />
    </div>
  );
};

export default AccountPagination;
