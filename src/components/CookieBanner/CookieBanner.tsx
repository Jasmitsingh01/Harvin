// import React, { useState, useEffect } from 'react';
// import CookieConsent from 'react-cookie-consent';
// import { Modal, Form } from 'react-bootstrap';
// import useIPDataStore from '../../stores/cookie/cookie-store';

// const CookieBanner = () => {
//   const [showModal, setShowModal] = useState(false);
//   const {
//     showOverlay,
//     strictlyNecessary,
//     fetchIPData,
//     setShowOverlay,
//     setStrictlyNecessary,
//   }: any = useIPDataStore();

//   useEffect(() => {
//     function getCookie(name) {
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.startsWith(name + '=')) {
//           return cookie.substring(name.length + 1);
//         }
//       }
//       return null;
//     }

//     const myCookieConsent = getCookie('myCookieConsent');

//     if (myCookieConsent === 'true') {
//       setShowOverlay(false);
//       return;
//     }

//     fetchIPData();
//   }, []);

//   const handleAccept = () => {
//     localStorage.setItem('myCookieConsent', 'true');
//     setShowOverlay(false);
//   };

//   const handleCustomize = () => {
//     setShowModal(true);
//     setShowOverlay(false);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setShowOverlay(true);
//   };

//   const handleSaveSettings = () => {
//     // Save the settings to localStorage or perform other actions as needed
//     localStorage.setItem('strictlyNecessaryCookies', strictlyNecessary);

//     // Set the myCookieConsent cookie to 'true'
//     setCookie('myCookieConsent', 'true', 365); // Set to expire in 365 days

//     setShowModal(false);
//     setShowOverlay(false);
//   };

//   function setCookie(name: any, value: any, days: any) {
//     let expires = '';
//     if (days) {
//       const date = new Date();
//       date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//       expires = '; expires=' + date.toUTCString();
//     }
//     document.cookie = name + '=' + value + expires + '; path=/';
//   }

//   return (
//     <>
//       {showOverlay && (
//         <div
//           className="accept-wrap"
//           id="cookieOverlay"
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             background: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 9999,
//           }}
//         >
//           <CookieConsent
//             location="bottom"
//             buttonText="Accept"
//             cookieName="myCookieConsent"
//             style={{ background: '#2B373B', zIndex: 10000 }}
//             buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
//             disableButtonStyles={true}
//             onAccept={handleAccept}
//             expires={150}
//             disableStyles
//           >
//             <p>This website uses cookies to enhance the user experience.</p>
//             <button
//               className="cookie-setting-btn"
//               onClick={handleCustomize}
//               style={{ marginLeft: '10px', fontSize: '13px' }}
//             >
//               Settings
//             </button>
//           </CookieConsent>
//         </div>
//       )}
//       <Modal
//         show={showModal}
//         onHide={handleCloseModal}
//         className="cookies-pop-up"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Cookie Settings</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <div className="mb-3">
//               <div className="form-check form-switch">
//                 <label
//                   className="form-check-label"
//                   htmlFor="strictlyNecessaryCheckbox"
//                 >
//                   Strictly Necessary Cookies
//                 </label>
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="strictlyNecessaryCheckbox"
//                   checked={strictlyNecessary}
//                   onChange={(e) => setStrictlyNecessary(e.target.checked)}
//                 />
//               </div>
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           {/* <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button> */}
//           <button onClick={handleSaveSettings} className="btn btn-theme">
//             Save Changes
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default CookieBanner;

import React, { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';

const CookieBanner = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [strictlyNecessary, setStrictlyNecessary] = useState<any>(true);

  useEffect(() => {
    function getCookie(name: any) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if this cookie is the one we're looking for
        if (cookie.startsWith(name + '=')) {
          // Return the cookie value
          return cookie.substring(name.length + 1);
        }
      }
      // Return null if cookie is not found
      return null;
    }

    const myCookieConsent = getCookie('myCookieConsent');

    // Check if myCookieConsent is 'true', not 'undefined' or null
    if (myCookieConsent === 'true') {
      // If consent is given, don't show overlay
      setShowOverlay(false);
      return;
    }

    // if (isLoggedIn === 'true' || !isLoggedIn) {
    //   setShowOverlay(false); // If logged in, don't show overlay
    //   return;
    // }

    const fetchData = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const { data } = response;
        const { country } = data;
        if (country && isEuropeanCountry(country)) {
          const cookieConsentAccepted = localStorage.getItem('myCookieConsent');
          setShowOverlay(cookieConsentAccepted !== 'true');
          const strictlyNecessaryCookies = localStorage.getItem(
            'strictlyNecessaryCookies'
          );
          if (strictlyNecessaryCookies !== null) {
            setStrictlyNecessary(JSON.parse(strictlyNecessaryCookies));
          }
        } else {
          setShowOverlay(false);
        }
      } catch (error) {
        console.error('Error fetching IP data:', error);
      }
    };

    fetchData();
  }, []);

  const isEuropeanCountry = (countryCode: any) => {
    const europeanCountryCodes = [
      'IN',
      'AT',
      'BE',
      'BG',
      'HR',
      'CY',
      'CZ',
      'DK',
      'EE',
      'FI',
      'FR',
      'DE',
      'GR',
      'HU',
      'IE',
      'IT',
      'LV',
      'LT',
      'LU',
      'MT',
      'NL',
      'PL',
      'PT',
      'RO',
      'SK',
      'SI',
      'ES',
      'SE',
    ];
    return europeanCountryCodes.includes(countryCode);
  };

  const handleAccept = () => {
    localStorage.setItem('myCookieConsent', 'true');
    setShowOverlay(false);
  };
  ``;

  const handleCustomize = () => {
    setShowModal(true);
    setShowOverlay(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowOverlay(true);
  };

  const handleSaveSettings = () => {
    // Save the settings to localStorage or perform other actions as needed
    localStorage.setItem('strictlyNecessaryCookies', strictlyNecessary);

    // Set the myCookieConsent cookie to 'true'
    setCookie('myCookieConsent', 'true', 365); // Set to expire in 365 days

    setShowModal(false);
    setShowOverlay(false);
  };

  // Function to set cookie
  function setCookie(name: any, value: any, days: any) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  const handleStrictlyNecessaryChange = (checked: any) => {
    setStrictlyNecessary(checked);
  };

  return (
    <>
      {showOverlay && (
        <div
          className="accept-wrap"
          id="cookieOverlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="myCookieConsent"
            style={{ background: '#2B373B', zIndex: 10000 }}
            buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
            disableButtonStyles={true}
            onAccept={handleAccept}
            expires={150}
            disableStyles
          >
            <p>This website uses cookies to enhance the user experience.</p>
            <button
              className="cookie-setting-btn"
              onClick={handleCustomize}
              style={{ marginLeft: '10px', fontSize: '13px' }}
            >
              Settings
            </button>
          </CookieConsent>
        </div>
      )}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="cookies-pop-up"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Strictly Necessary Cookies
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={strictlyNecessary}
                  onChange={(e) =>
                    handleStrictlyNecessaryChange(e.target.checked)
                  }
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleSaveSettings} className="btn btn-theme">
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CookieBanner;
