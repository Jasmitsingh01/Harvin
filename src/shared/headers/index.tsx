'use client';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../assets/images/harvin-chairs-logo.png';
// import Link from 'next/link';
// import Image from 'next/image';
import MainMenu from './main-menu/main-menu';
import ProgressiveImage from '../progressive-image';
import { NavStyled } from './styled';
import Input from '../fields/Input';
import dynamic from 'next/dynamic';
import AuthModal from '../../components/auth';
import { useModalData } from '../../stores/user/user-store';
import { useRouter } from 'next/router';
import { useSearchData } from '../../stores/search/search-store';
import { searchProductsPost } from '../../stores/search/search-action';
import { debounce, isEmpty, trim } from 'lodash';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
const RightPanel = dynamic(() => import('./RightPanel'), { ssr: false });

const Header = () => {
  const { modal } = useModalData();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = React.useState('');
  // const [loading, setLoading] = React.useState(false);

  const { searchedItems, loading } = useSearchData();
  const [apiCallComplete, setApiCallComplete] = useState(false);

  const [submenuStates, setSubmenuStates] = useState([]);

  // const handleSearch = async () => {
  //   getSearchProductItems(searchTerm);
  // };

  const handleSearch = () => {
    if (trim(searchTerm).length >= 3) {
      router.push(`/search?key=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const delayDebounceFn = setTimeout(async () => {
      if (trim(searchTerm).length >= 3) {
        await searchProductsPost(searchTerm);

        if (isMounted) {
          setApiCallComplete(true);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(delayDebounceFn);
      isMounted = false;
    };
  }, [searchTerm]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleApiCall = (value) => {
    trim(value) !== '' && searchProductsPost(value);
  };
  const debouncedApiCall = useRef(debounce(handleApiCall, 1000));

  const handleChange = (_, value) => {
    const trimmedValue = value.replace(/^\s+/, '');
    setSearchTerm(trimmedValue);
    debouncedApiCall.current(trimmedValue);
    setApiCallComplete(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      searchProductsPost('');
      setSearchTerm('');
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  //offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDropdownClick = (index) => {
    const newSubmenuStates = [...submenuStates];
    newSubmenuStates[index] = !newSubmenuStates[index];

    // Close previously opened submenu
    for (let i = 0; i < newSubmenuStates.length; i++) {
      if (i !== index) {
        newSubmenuStates[i] = false;
      }
    }

    setSubmenuStates(newSubmenuStates);
  };

  const { data } = useSWR(ROUTES.getMenus(), fetcherSWR);
  //offcanvas

  //mobile menu
  // const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const nextUl = event.currentTarget.nextElementSibling as HTMLUListElement;
  //   const parentDiv = event.currentTarget.parentElement as HTMLDivElement;
  //   if (nextUl) {
  //     nextUl.style.display = nextUl.style.display === 'none' ? 'block' : 'none';
  //     if (nextUl.style.display === 'block') {
  //       parentDiv.classList.add('dropdown-open');
  //     } else {
  //       parentDiv.classList.remove('dropdown-open');
  //     }
  //   }
  // };
  //mobile menu

  return (
    <>
      {modal && <AuthModal />}

      <Offcanvas show={show} onHide={handleClose} className="mobile-menu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mob-mainmenu">
            {data?.map((item, index) => (
              <ul key={item.title}>
                <li>
                  <span
                    onClick={() => {
                      if (item.is_external) {
                        if (item.target === '_blank') {
                          window.open(item.url, '_blank');
                        } else {
                          window.open(item.url, '_self');
                        }
                      } else {
                        // router.push(`/${item.url}`);
                        if (
                          item.url.startsWith('http://') ||
                          item.url.startsWith('https://')
                        ) {
                          window.open(item.url, '_blank'); // Open in a new tab
                        } else {
                          router.push(`/${item.url}`); // Navigate using React Router
                        }
                      }
                      handleClose();
                    }}
                  >
                    {item?.title}
                  </span>

                  {!isEmpty(item?.submenu) && (
                    <div>
                      <span
                        className="menu-dropdown"
                        onClick={() => handleDropdownClick(index)}
                      >
                        <i
                          className={`fa-regular fa-angle-${
                            submenuStates[index] ? 'up' : 'down'
                          } fa-lg`}
                        ></i>
                      </span>
                      <ul>
                        {submenuStates[index] &&
                          item.submenu.map((child) => (
                            <li key={child.title}>
                              <span
                                onClick={() => {
                                  router.push(`/${child.url}`);
                                  handleClose();
                                }}
                              >
                                {child.title}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <NavStyled>
        <nav>
          <div className="container">
            <div className="navbar">
              <div className="nav-icon cursor-pointer" onClick={handleShow}>
                <i className="fa-regular fa-bars-staggered"></i>
              </div>
              <a href="/" className="order-1">
                <ProgressiveImage src={Logo} alt="" width="199" />
              </a>
              <div className="header-search position-relative order-3 order-md-2 mt-4 mt-md-0">
                <Input
                  placeholder={'whatIsYouAreLookingFor'}
                  name="search"
                  type="string"
                  value={searchTerm}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                <i
                  className="fa-regular fa-magnifying-glass"
                  onClick={handleSearch}
                ></i>
                {searchTerm.length >= 3 && (
                  <div className="search-result-box shadow">
                    {loading && !apiCallComplete && <p>Loading...</p>}
                    {!loading &&
                      apiCallComplete &&
                      searchedItems.length > 0 && (
                        <ul>
                          {searchedItems.map((elem) => (
                            <li
                              key={elem.id}
                              onClick={() => {
                                setSearchTerm('');
                                router.push(`/${elem?.url}`);
                              }}
                            >
                              {elem?.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    {!loading && apiCallComplete && isEmpty(searchedItems) && (
                      <p>No Result Found</p>
                    )}
                  </div>
                )}
              </div>
              <RightPanel />
            </div>
          </div>
        </nav>
      </NavStyled>
      {router.pathname === '/cart' || router.pathname.includes('/thankyou') ? (
        ''
      ) : (
        <MainMenu />
      )}
    </>
  );
};

export default Header;
