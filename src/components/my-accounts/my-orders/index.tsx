// import React, { useState, useEffect } from 'react';
// import ROUTES from '../../../utilities/api-routes';
// import { fetcherSWR } from '../../../services/api';
// import useSWR, { mutate } from 'swr';
// import { isEmpty } from 'lodash';
// import Loading from '../../../shared/Loading';
// import { parseUrlParams } from '../../../utilities/helper';
// import { useRouter } from 'next/router';
// import ProgressiveImage from '../../../shared/progressive-image';
// import { PaginationStyled } from '../../product-listing/styled';
// import Pagination from 'react-js-pagination';
// // import NoDataAvailable from '../../../shared/common/NoDataAvailable';
// import img from '../../../assets/images/order.png';
// import CancelReasonModal from '../../../shared/CancelReasonModal';
// import Modal from 'react-modal';
// import { orderCancel } from '../../../stores/orders/order-action';

// const MyOrders = () => {
//   const router = useRouter();
//   const [selectedYear, setSelectedYear] = useState('Last 6 months');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [filterStartDate, setFilterStartDate] = useState('');
//   const [filterEndDate, setFilterEndDate] = useState('');

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [cancelReasonModalOpen, setCancelReasonModalOpen] = useState(false);

//   const [OrderId, setorderId] = useState<any>();

//   const swrConfig = {
//     revalidateIfStale: true,
//     refreshInterval: 0,
//     revalidateOnFocus: false,
//   };

//   const handleModalToggle = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleEnquireNowButtonClick = (orderId) => {
//     setorderId(orderId); // Set the orderId to cancel in state
//     setIsModalOpen(true);
//   };

//   const handleCancelOrder = () => {
//     setCancelReasonModalOpen(true);
//   };

//   const [reason, setReason] = useState('');

//   const handleSubmitCancelReason = async (reason) => {
//     setCancelReasonModalOpen(false);
//     setIsModalOpen(false);
//     const success: any = await orderCancel(OrderId, reason);
//     if (success) {
//       setReason('');
//       // Trigger a re-fetch of data after cancelling the order
//       mutate(
//         `${ROUTES.myorders(
//           queryParams.page || 1
//         )}&filter_start_date=${filterStartDate}&filter_end_date=${filterEndDate}`
//       );
//     }
//   };
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleYearChange = (year: string) => {
//     let startDate = '';
//     let endDate = '';

//     if (year === 'Last 6 months') {
//       const currentDate = new Date();
//       const sixMonthsAgo = new Date();
//       sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

//       startDate = `${sixMonthsAgo.getFullYear()}-${(sixMonthsAgo.getMonth() + 1)
//         .toString()
//         .padStart(2, '0')}-01`;

//       endDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
//         .toString()
//         .padStart(2, '0')}-${currentDate.getDate()}`;
//     } else {
//       startDate = `${year}-01-01`;
//       endDate = `${year}-12-31`;
//     }

//     setSelectedYear(year);
//     setFilterStartDate(startDate);
//     setFilterEndDate(endDate);
//     toggleDropdown();
//     // setDropdownOpen(false);
//     // router.push(`/my-accounts#/my-orders?page=1`, undefined, { shallow: true });
//   };

//   useEffect(() => {
//     handleYearChange('Last 6 months');
//     setDropdownOpen(false);
//   }, []);

//   const queryParams: any = parseUrlParams(router.asPath);
//   const { data: result, error } = useSWR(
//     `${ROUTES.myorders(
//       queryParams.page || 1
//     )}&filter_start_date=${filterStartDate}&filter_end_date=${filterEndDate}`,
//     fetcherSWR,
//     swrConfig
//   );

//   console.log(result?.data, 'resulttt');

//   const handlePageChange = (pageNumber: number) => {
//     const newUrl = `/my-accounts#/my-orders?page=${pageNumber}`;
//     router.push(newUrl, undefined, { shallow: true });

//     mutate(
//       `${ROUTES.myorders(
//         pageNumber
//       )}&filter_start_date=${filterStartDate}&filter_end_date=${filterEndDate}`
//     );
//   };

//   const loading = isEmpty(result) && !error;

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <div className="right-side-wrap my-order-left">
//         <div className="dropdown my-order-dropdown">
//           <button
//             className="btn btn-secondary dropdown-toggle"
//             type="button"
//             onClick={toggleDropdown}
//             aria-expanded={dropdownOpen ? 'true' : 'false'}
//           >
//             {selectedYear}
//           </button>
//           <ul
//             className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
//             onClick={toggleDropdown}
//           >
//             <li>
//               <button
//                 className="dropdown-item"
//                 onClick={() => handleYearChange('Last 6 months')}
//               >
//                 Last 6 months
//               </button>
//             </li>
//             <li>
//               <button
//                 className="dropdown-item"
//                 onClick={() => handleYearChange('2021')}
//               >
//                 2021
//               </button>
//             </li>
//             <li>
//               <button
//                 className="dropdown-item"
//                 onClick={() => handleYearChange('2022')}
//               >
//                 2022
//               </button>
//             </li>
//             <li>
//               <button
//                 className="dropdown-item"
//                 onClick={() => handleYearChange('2023')}
//               >
//                 2023
//               </button>
//             </li>
//             <li>
//               <button
//                 className="dropdown-item"
//                 onClick={() => handleYearChange('2024')}
//               >
//                 2024
//               </button>
//             </li>
//           </ul>
//         </div>

//         {isEmpty(result?.data) ? (
//           <section className="no-result-section">
//             <div className="container">
//               <div className="no-result text-center">
//                 <p className="text-20 weight-500">
//                   Sorry you don&rsquo;t have any orders!
//                 </p>
//               </div>
//             </div>
//           </section>
//         ) : (
//           <>
//             {result?.data?.map((item) => (
//               <div key={item.id} className="my-order-wrap">
//                 <div className="order-id-wrap d-flex align-items-center">
//                   <ProgressiveImage src={img} />
//                   <h4 className="text-20 weight-600 mb-0">
//                     Order ID #{item.tracking_number}
//                   </h4>
//                   <span>({item.products.length} items)</span>

//                   {item?.can_cancel_order && (
//                     <button
//                       className="btn btn-theme-cancel ms-auto"
//                       onClick={() => handleEnquireNowButtonClick(item.id)}
//                     >
//                       Cancel Order
//                     </button>
//                   )}

//                   <CancelReasonModal
//                     isOpen={cancelReasonModalOpen}
//                     onClose={() => setCancelReasonModalOpen(false)}
//                     onSubmit={(reason: any) => handleSubmitCancelReason(reason)}
//                     orderId={item.id}
//                     reason={reason}
//                     setReason={setReason}
//                   />
//                 </div>
//                 <div className="my-order-list">
//                   {item?.products.map((product) => (
//                     <a key={item.id} href={`/orderDetails/${item.id}`}>
//                       <div key={item?.id} className="order-detail-item-listing">
//                         <div className="order-detail-item">
//                           <div className="order-detail-img">
//                             <ProgressiveImage
//                               src={product?.gallery[0].original}
//                               width={89}
//                               layout={'intrinsic'}
//                             />
//                           </div>
//                           <div className="order-detail-info">
//                             <h4 className="text-16 weight-600">
//                               {product.name}
//                             </h4>
//                             <p>{product?.pivot?.order_status}</p>
//                             {/* <p>Delivery Expected By 03 October 2023</p> */}
//                           </div>
//                         </div>
//                         <div className="">
//                           <i className="fa-solid fa-chevron-right"></i>
//                         </div>
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             <PaginationStyled>
//               <Pagination
//                 activePage={result.current_page}
//                 itemsCountPerPage={result.per_page}
//                 totalItemsCount={result.total}
//                 pageRangeDisplayed={5}
//                 onChange={handlePageChange}
//                 itemClass={'page-item'}
//                 innerClass="pagination"
//                 activeClass="active"
//                 linkClass="page-link"
//               />
//             </PaginationStyled>

//             <Modal
//               isOpen={isModalOpen}
//               onRequestClose={handleModalToggle}
//               style={{
//                 overlay: {
//                   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                   zIndex: 999,
//                 },
//               }}
//               className="modal-contenteqnuire"
//             >
//               <div
//                 id="select-bank"
//                 aria-labelledby="exampleModalLabel"
//                 style={{ display: 'block' }}
//               >
//                 <div className="modal-dialog show">
//                   <div className="modal-content text-center">
//                     <form autoComplete="off" className="login-form" noValidate>
//                       <span className="icon bg-light-theme mt-5 mx-auto text-theme">
//                         <i className="fa-light fa-trash-can fa-3x"></i>
//                       </span>
//                       <h3 className="text-24 weight-600 mt-4 pt-3">
//                         Are you sure you want to cancel this order?
//                       </h3>
//                       <div className="confirmation-buttons mt-5">
//                         <span
//                           className="btn btn-theme cursor-pointer d-inline-block w-auto px-4"
//                           onClick={handleCancelOrder}
//                         >
//                           Yes, Cancel My Order
//                         </span>
//                         <span
//                           className="btn btn-theme-outline ms-2 px-4"
//                           onClick={handleModalToggle}
//                         >
//                           Cancel
//                         </span>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Modal>

//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyOrders;

import React, { useState, useEffect } from 'react';
import ROUTES from '../../../utilities/api-routes';
import { fetcherSWR } from '../../../services/api';
import useSWR, { mutate } from 'swr';
import { isEmpty } from 'lodash';
import Loading from '../../../shared/Loading';
import { parseUrlParams } from '../../../utilities/helper';
import { useRouter } from 'next/router';
import ProgressiveImage from '../../../shared/progressive-image';
import { PaginationStyled } from '../../product-listing/styled';
import Pagination from 'react-js-pagination';
// import NoDataAvailable from '../../../shared/common/NoDataAvailable';
import img from '../../../assets/images/order.png';
import CancelReasonModal from '../../../shared/CancelReasonModal';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { orderCancel } from '../../../stores/orders/order-action';
import moment from 'moment';

const MyOrders = () => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState('Last 6 months');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReasonModalOpen, setCancelReasonModalOpen] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleModalToggle = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  const [OrderId, setorderId] = useState<any>();

  const swrConfig = {
    revalidateIfStale: true,
    refreshInterval: 0,
    revalidateOnFocus: false,
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEnquireNowButtonClick = (orderId) => {
    setorderId(orderId); // Set the orderId to cancel in state
    setIsModalOpen(true);
  };

  const handleCancelOrder = () => {
    setCancelReasonModalOpen(true);
    setIsModalOpen(true);
  };

  const [reason, setReason] = useState('');

  const handleSubmitCancelReason = async (reason) => {
    setCancelReasonModalOpen(false);
    setIsModalOpen(false);
    const success: any = await orderCancel(OrderId, reason);
    if (success) {
      setReason('');
      // Trigger a re-fetch of data after cancelling the order
      mutate(
        `${ROUTES.myorders(
          queryParams.page || 1
        )}&filter_start_date=${filterStartDate}&filter_end_date=${filterEndDate}`
      );
    }
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleYearChange = (year: string) => {
    let startDate = '';
    let endDate = '';

    if (year === 'Last 6 months') {
      const currentDate = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

      startDate = `${sixMonthsAgo.getFullYear()}-${(sixMonthsAgo.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-01`;

      endDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate()}`;
    } else {
      startDate = `${year}-01-01`;
      endDate = `${year}-12-31`;
    }

    setSelectedYear(year);
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    toggleDropdown();
    // setDropdownOpen(false);
    // router.push(`/my-accounts#/my-orders?page=1`, undefined, { shallow: true });
  };

  useEffect(() => {
    handleYearChange('Last 6 months');
    setDropdownOpen(false);
  }, []);

  const queryParams: any = parseUrlParams(router.asPath);
  const { data: result, error } = useSWR(
    `${ROUTES.myorders(
      queryParams.page || 1
    )}&filter_start_date=${filterStartDate}&filter_end_date=${filterEndDate}`,
    fetcherSWR,
    swrConfig
  );

  console.log(result?.data, 'resulttt');

  const handlePageChange = (pageNumber: number) => {
    const newUrl = `/my-accounts#/my-orders?page=${pageNumber}`;
    router.push(newUrl, undefined, { shallow: true });

    mutate(
      `${ROUTES.myorders(
        pageNumber
      )}&filter_start_date=${filterStartDate}&filter_end_date=${filterEndDate}`
    );
  };

  const loading = isEmpty(result) && !error;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="right-side-wrap my-order-left">
        <div className="dropdown my-order-dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen ? 'true' : 'false'}
          >
            {selectedYear}
          </button>
          <ul
            className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
            onClick={toggleDropdown}
          >
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleYearChange('Last 6 months')}
              >
                Last 6 months
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleYearChange('2021')}
              >
                2021
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleYearChange('2022')}
              >
                2022
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleYearChange('2023')}
              >
                2023
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleYearChange('2024')}
              >
                2024
              </button>
            </li>
          </ul>
        </div>

        {isEmpty(result?.data) ? (
          <section className="no-result-section">
            <div className="container">
              <div className="no-result text-center">
                <p className="text-20 weight-500">
                  Sorry you don&rsquo;t have any orders!
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            {result?.data?.map((item) => (
              <div key={item.id} className="my-order-wrap">
                <div className="order-id-wrap d-flex">
                  <ProgressiveImage src={img} />

                  <h4 className="text-20 weight-600 mb-0">
                    Order ID #{item.tracking_number}
                    {item?.order_status === 'Order Shipped' && (
                      <p
                        className="order-detail-info font-weight-normal text-16 mt-2"
                        style={{ color: '#7f7f7f' }}
                      >
                        Delivery Expected By{' '}
                        {moment(item?.expected_date).format('DD MMMM YYYY')}
                      </p>
                    )}
                  </h4>

                  <span>({item.products.length} items)</span>

                  {item?.can_cancel_order && (
                    <button
                      className="btn btn-theme-cancel ms-auto"
                      onClick={() => handleEnquireNowButtonClick(item.id)}
                    >
                      Cancel Order
                    </button>
                  )}

                  {item?.shipping_tracking_url !== null && (
                    <button
                      className="btn btn-theme-cancel ms-auto"
                      onClick={() =>
                        window.open(item?.shipping_tracking_url, '_blank')
                      }
                    >
                      <i className="fa-solid fa-location-crosshairs me-2"></i>
                      Track Order
                    </button>
                  )}
                </div>

                <div className="my-order-list">
                  {item?.products.map((product) => (
                    <a key={item.id} href={`/orderDetails/${item.id}`}>
                      <div key={item?.id} className="order-detail-item-listing">
                        <div className="order-detail-item">
                          <div className="order-detail-img">
                            <ProgressiveImage
                              src={product?.gallery[0].original}
                              width={89}
                              layout={'intrinsic'}
                            />
                          </div>
                          <div className="order-detail-info">
                            <h4 className="text-16 weight-600">
                              {product.name}
                            </h4>
                            <p>{product?.pivot?.order_status}</p>
                          </div>
                        </div>
                        <div className="">
                          <i className="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <CancelReasonModal
              isOpen={cancelReasonModalOpen}
              onClose={() => setCancelReasonModalOpen(false)}
              onSubmit={(reason: any) => handleSubmitCancelReason(reason)}
              // orderId={item.id}
              reason={reason}
              setReason={setReason}
            />
            <PaginationStyled>
              <Pagination
                activePage={result.current_page}
                itemsCountPerPage={result.per_page}
                totalItemsCount={result.total}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass={'page-item'}
                innerClass="pagination"
                activeClass="active"
                linkClass="page-link"
              />
            </PaginationStyled>

            <Modal show={isModalOpen} onHide={handleModalToggle} centered>
              <Modal.Body>
                <div className="text-center">
                  <span className="icon bg-light-theme mt-5 mx-auto text-theme">
                    <i className="fa-light fa-trash-can fa-3x"></i>
                  </span>
                  <h3 className="text-24 weight-600 mt-4 pt-3">
                    Are you sure you want to cancel this order?
                  </h3>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{ border: 'none' }}
                  className="btn btn-theme cursor-pointer d-inline-block w-auto px-4 border-none"
                  onClick={() => {
                    handleCancelOrder();
                    handleModalToggle();
                  }}
                >
                  Yes, Cancel My Order
                </Button>
                <Button
                  className="btn btn-theme-outline ms-2 px-4"
                  onClick={handleModalToggle}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default MyOrders;
