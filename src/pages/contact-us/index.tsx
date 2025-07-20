// import * as React from 'react';
// import BreadCrumbs from '../../shared/breadcrumbs';

// const Contact = () => {
//   return (
//     <>
//       <BreadCrumbs />
//       <section className="my-5">
//         <div className="container">
//           <div className="section-heading text-center mt-5">
//             <h2>Connect with Us</h2>
//             <p className="text-18 weight-500 mb-0 mt-4 mx-lg-5 px-lg-5 pt-3">
//               Welcome to our world of creativity, innovation, and relaxation –
//               where every seat tells a story.
//             </p>
//             <p className="text-18 weight-500 mb-0 mx-lg-5 px-lg-5 mt-2">
//               Join us on this journey of comfort and style.
//             </p>
//           </div>
//           <div className="row mt-5 ">
//             <div className="col-md-6 pt-3">
//               <p>
//                 <span className="weight-600 me-2">Email:</span>
//                 <a href="mailto: connect@harvinchairs.com">
//                   connect@harvinchairs.com
//                 </a>
//               </p>
//               <p>
//                 <span className="weight-600 me-2">Address:</span>92 STREET, 1/A
//                 PRAGATI NAGAR, RISALI BHILAI Civic Centre Bhilai Durg Durg
//                 Chhattisgarh – 490006 India
//               </p>
//             </div>
//             <div className="col-md-6">
//               <div>
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12510.145112796086!2d81.3086418881289!3d21.22040958860988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293d3d1b64bb7f%3A0xdc1792e6f57275f7!2s92%2C%20Street%20No.%201-A%2C%20Smriti%20Nagar%2C%20Bhilai%2C%20Chhattisgarh%20490020!5e0!3m2!1sen!2sin!4v1719235085404!5m2!1sen!2sin"
//                   width="100%"
//                   height="400"
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
// export default Contact;

import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import ROUTES from '../../utilities/api-routes';
import api from '../../services/api';

const ContactUs = dynamic(
  () => import('../../components/staticPages/contactUs'),
  {
    ssr: false,
  }
);

const ContactUsContainer: NextPage = (props: any) => {
  const { data } = props;
  return <ContactUs data={data} />;
};

export async function getServerSideProps(context: any) {
  const { locale } = context;
  try {
    const { data: result } = await api.get(ROUTES.contactus());
    return {
      props: {
        data: result,
        ...(await serverSideTranslations(locale)),
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        ...(await serverSideTranslations(locale)),
      },
    };
  }
}
export default ContactUsContainer;
