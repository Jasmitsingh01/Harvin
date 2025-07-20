// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import Input from '../../shared/fields/Input';
// import { enquireInputs } from '../../shared/fields/field-data';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { userEnquireSchema } from '../../validations/auth/user';
// import { useTranslation } from 'react-i18next';
// import Modal from 'react-modal';
// import Button from '../../shared/common/Button';
// import { postEnquire } from '../../stores/reviews/review-action';
// import useSWR from 'swr';
// import { fetcherSWR } from '../../services/api';
// import ROUTES from '../../utilities/api-routes';

// const HelpDesk = () => {
//   const router = useRouter();
//   const [currentTab, setCurrentTab] = useState('tabs-1');

//   const { t } = useTranslation();
//   const {
//     register: userRegister,
//     handleSubmit,
//     control,
//     setValue,
//     trigger,
//     formState: { errors },
//   } = useForm<any>({
//     resolver: yupResolver(userEnquireSchema),
//     shouldUnregister: false,
//     // defaultValues: { email: '', password:""},
//   });

//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const handleHashChange = (e?: any) => {
//       const hashFragment = (e?.newURL || router.asPath).split('#')[1];
//       setCurrentTab(hashFragment || 'tabs-1');
//     };

//     // Call handleHashChange when the component mounts
//     handleHashChange();

//     // Add event listener for hashchange
//     window.addEventListener('hashchange', handleHashChange);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('hashchange', handleHashChange);
//     };
//   }, []);

//   const handleLogin = async (values: any) => {
//     setLoading(true);
//     postEnquire(values, handleCalbback);
//   };

//   const { data: faqs } = useSWR(ROUTES.getFaq(), fetcherSWR);

//   const handleCalbback = () => {
//     setValue('name', '');
//     setValue('email', '');
//     setValue('message', '');
//     setLoading(false);
//     setIsModalOpen(false);
//   };

//   const handleModalToggle = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleEnquireNowButtonClick = () => {
//     setIsModalOpen(true);
//   };

//   const [faqData, setFaqData] = useState<any>(null); // State for storing fetched FAQs

//   const tabId = currentTab.split('-')[1]; // Extract tab ID from currentTab
//   const faqRoute = ROUTES.getFaqId(tabId); // Generate route to fetch FAQs based on tab ID
//   const { data: fetchedFaqData } = useSWR(faqRoute, fetcherSWR); // Fetch FAQs using useSWR hook

//   // Update faqData state with fetched FAQs whenever fetchedFaqData changes
//   useEffect(() => {
//     setFaqData(fetchedFaqData);
//   }, [fetchedFaqData]);

//   const handleTabClick = (faqId) => {
//     setCurrentTab(`tabs-${faqId}`);
//   };

//   return (
//     <div className="container">
//       <div className="back-to-btn-wrap d-flex align-items-center">
//         <span className="text-18 weight-500" onClick={() => router.back()}>
//           <i className="fa-regular fa-arrow-left-long"></i>Back
//         </span>
//       </div>
//       <div className="my-account-wrap">
//         <div className="help-desk-title-wrap text-center">
//           <h2>Help Desk</h2>
//           <p>
//             Explore Our Help Center for Furniture Order, Return, and Assembly
//             Guidance.
//           </p>
//           <div className="search-query-wrap position-relative">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search your query here..."
//             />
//             <i className="fa-regular fa-magnifying-glass"></i>
//           </div>
//         </div>
//         <ul className="nav nav-tabs help-desk-tab">
//           {faqs?.data?.map((item) => (
//             <li className="nav-item" role="presentation" key={item.id}>
//               <a
//                 className={`nav-link ${
//                   currentTab === `tabs-${item.id}` ? 'active show' : ''
//                 }`}
//                 href={`#tabs-${item.id}`}
//                 data-bs-toggle="tab"
//                 onClick={() => handleTabClick(item.id)}
//               >
//                 <div className="help-desk-icon">
//                   <img
//                     src={
//                       currentTab === `tabs-${item.id}`
//                         ? item.selected_icon
//                         : item.icon
//                     }
//                     alt={item.name}
//                     width="52"
//                     height="50"
//                   />

//                   {/* <ProgressiveImage src={
//             currentTab === `tabs-${item.id}` ? item.icon : item.icon
//           } alt="" width="52" height="50"/> */}
//                 </div>
//                 <h4>{item.name}</h4>
//                 <p>{item.subline}</p>
//               </a>
//             </li>
//           ))}
//         </ul>
//         <div></div>
//         <div className="tab-content help-desk-faq-tab">
//           {faqData && (
//             <div>
//               <h2 className="help-faq-title">Frequently Asked Questions</h2>
//               <div className="accordion" id="tracking-question">
//                 {faqData.map((faq, index) => (
//                   <div className="accordion-item" key={index}>
//                     <h2 className="accordion-header">
//                       <button
//                         className={`accordion-button ${
//                           index === 0 ? '' : 'collapsed'
//                         }`}
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target={`#tracking-faq-${index + 1}`}
//                         aria-expanded={index === 0 ? 'true' : 'false'}
//                         aria-controls="collapse"
//                       >
//                         {faq.question}
//                       </button>
//                     </h2>
//                     <div
//                       id={`tracking-faq-${index + 1}`}
//                       className={`accordion-collapse collapse ${
//                         index === 0 ? 'show' : ''
//                       }`}
//                       data-bs-parent="#tracking-question"
//                     >
//                       <div className="accordion-body">{faq.answer}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <button
//           className="btn btn-theme proceed-btn"
//           onClick={handleEnquireNowButtonClick}
//         >
//           {t('enquireNow')}
//         </button>

//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={handleModalToggle}
//           style={{
//             overlay: {
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             },
//           }}
//           className="modal-contenteqnuire-data"
//         >
//           <div
//             id="select-bank"
//             aria-labelledby="exampleModalLabel"
//             style={{ display: 'block' }}
//           >
//             <div className="modal-dialog show">
//               <div className="modal-content">
//                 <form
//                   autoComplete="off"
//                   className="login-form"
//                   onSubmit={handleSubmit(handleLogin)}
//                   noValidate
//                 >
//                   <button
//                     onClick={handleModalToggle}
//                     style={{
//                       float: 'right',
//                       border: 'none',
//                       background: 'none',
//                       cursor: 'pointer',
//                       fontSize: '20px',
//                     }}
//                   >
//                     X
//                   </button>
//                   <h3 className="text-24 weight-600">Enquire Now</h3>
//                   {enquireInputs.map((field) => (
//                     <Input
//                       key={field.name}
//                       type={field.type}
//                       name={field.name}
//                       register={userRegister}
//                       control={control}
//                       errors={errors}
//                       placeholder={field.placeholder}
//                       className="form-control"
//                       setValue={setValue}
//                       trigger={trigger}
//                     />
//                   ))}
//                   <div style={{ marginTop: '20px' }}>
//                     <Button
//                       type="submit"
//                       className="btn login-btn"
//                       // text={t('submit')}
//                       text={
//                         loading ? (
//                           <div className="loaderenquire"></div>
//                         ) : (
//                           t('submit')
//                         )
//                       }
//                       // loading={loading}
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };
// export default HelpDesk;

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Input from '../../shared/fields/Input';
import { enquireInputs } from '../../shared/fields/field-data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userEnquireSchema } from '../../validations/auth/user';
import { useTranslation } from 'react-i18next';
// import Modal from 'react-modal';
import Button from '../../shared/common/Button';
import { postEnquire } from '../../stores/reviews/review-action';
import useSWR from 'swr';
import { fetcherSWR } from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { Modal } from 'react-bootstrap';

const HelpDesk = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('tabs-1');
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation();
  const {
    register: userRegister,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(userEnquireSchema),
    shouldUnregister: false,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleHashChange = (e?: any) => {
      const hashFragment = (e?.newURL || router.asPath).split('#')[1];
      setCurrentTab(hashFragment || 'tabs-1');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLogin = async (values: any) => {
    setLoading(true);
    postEnquire(values, handleCallback);
  };

  const { data: faqs } = useSWR(ROUTES.getFaq(), fetcherSWR);

  const handleCallback = () => {
    setValue('name', '');
    setValue('email', '');
    setValue('message', '');
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEnquireNowButtonClick = () => {
    setIsModalOpen(true);
  };

  const [faqData, setFaqData] = useState<any>(null);
  const tabId = currentTab.split('-')[1];
  const faqRoute = searchQuery
    ? ROUTES.getFaqIdSearch(searchQuery)
    : ROUTES.getFaqId(tabId);
  const { data: fetchedFaqData } = useSWR(faqRoute, fetcherSWR);

  useEffect(() => {
    setFaqData(fetchedFaqData);
  }, [fetchedFaqData]);

  const handleTabClick = (faqId) => {
    setCurrentTab(`tabs-${faqId}`);
  };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   // Trigger search API call with the searchQuery
  // };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const clearSearch = () => {
  //   setSearchQuery('');
  //   setCurrentTab('tabs-1'); // Reset to default FAQs
  // };

  return (
    <div className="container">
      <div className="back-to-btn-wrap d-flex align-items-center">
        <span className="text-18 weight-500" onClick={() => router.back()}>
          <i className="fa-regular fa-arrow-left-long"></i>Back
        </span>
      </div>
      <div className="my-account-wrap">
        <div className="help-desk-title-wrap text-center">
          <h2>Help Desk</h2>
          <p>
            Explore Our Help Center for Furniture Order, Return, and Assembly
            Guidance.
          </p>
          <div className="search-query-wrap position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search your query here..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <i className="fa-regular fa-magnifying-glass"></i>
          </div>
        </div>

        {!searchQuery && (
          <ul className="nav nav-tabs help-desk-tab">
            {faqs?.data?.map((item: any) => (
              <li className="nav-item" role="presentation" key={item.id}>
                <a
                  className={`nav-link ${
                    currentTab === `tabs-${item.id}` ? 'active show' : ''
                  }`}
                  href={`#tabs-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                >
                  <div className="help-desk-icon">
                    <img
                      src={
                        currentTab === `tabs-${item.id}`
                          ? item.selected_icon
                          : item.icon
                      }
                      alt={item.name}
                      width="52"
                      height="50"
                    />
                  </div>
                  <h4>{item.name}</h4>
                  <p>{item.subline}</p>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* <div className="tab-content help-desk-faq-tab">
    {faqData && (
      <div>
        <h2 className="help-faq-title">Frequently Asked Questions</h2>
        <div className="accordion" id="tracking-question">
          {faqData.map((faq: any, index: number) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#tracking-faq-${index + 1}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls="collapse"
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`tracking-faq-${index + 1}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                data-bs-parent="#tracking-question"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div> */}

        <div className="tab-content help-desk-faq-tab">
          {faqData && faqData.length > 0 ? (
            <div>
              <h2 className="help-faq-title">Frequently Asked Questions</h2>
              <div className="accordion" id="tracking-question">
                {faqData.map((faq, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          index === 0 ? '' : 'collapsed'
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#tracking-faq-${index + 1}`}
                        aria-expanded={index === 0 ? 'true' : 'false'}
                        aria-controls={`tracking-faq-${index + 1}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`tracking-faq-${index + 1}`}
                      className={`accordion-collapse collapse ${
                        index === 0 ? 'show' : ''
                      }`}
                      data-bs-parent="#tracking-question"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <section className="no-result-section">
              <div className="container">
                <div className="no-result text-center">
                  <p className="text-20 weight-500">No Data Found</p>
                </div>
              </div>
            </section>
          )}
        </div>

        {faqData && faqData?.length > 0 && (
          <button
            className="btn btn-theme proceed-btn w-auto px-5 mt-4"
            onClick={handleEnquireNowButtonClick}
          >
            {t('enquireNow')}
          </button>
        )}

        <Modal show={isModalOpen} onHide={handleModalToggle} centered>
          <Modal.Body>
            <div>
              <form
                autoComplete="off"
                className="login-form"
                onSubmit={handleSubmit(handleLogin)}
                noValidate
              >
                <button
                  onClick={handleModalToggle}
                  style={{
                    float: 'right',
                    border: 'none',
                    background: 'none',
                  }}
                >
                  X
                </button>
                <h3 className="text-24 weight-600">Enquire Now</h3>
                {enquireInputs.map((field) => (
                  <Input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    register={userRegister}
                    control={control}
                    errors={errors}
                    placeholder={field.placeholder}
                    className="form-control"
                    setValue={setValue}
                    trigger={trigger}
                  />
                ))}
                <div style={{ marginTop: '20px' }}>
                  <Button
                    type="submit"
                    className="btn login-btn"
                    text={
                      loading ? (
                        <div className="loaderenquire"></div>
                      ) : (
                        t('submit')
                      )
                    }
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default HelpDesk;
