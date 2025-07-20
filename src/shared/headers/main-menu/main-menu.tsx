import React from 'react';
import { MainMenuStyled } from './main-menu.styled';
import { isEmpty, range } from 'lodash';
import ProgressiveImage from '../../progressive-image';
import useSWR from 'swr';
import { fetcherSWR } from '../../../services/api';
import ROUTES from '../../../utilities/api-routes';
import { Skeleton } from '@mui/material';
import { MenuType } from '../../../interface/common';
import { useRouter } from 'next/router';
import menuimg from '../../../assets/images/submenu-img.png';
import Link from 'next/link';
const MenuSkeleton = ({ value }: { value: number }): any =>
  range(value).map((item) => (
    <li key={`${item}`}>
      <Skeleton variant="rectangular" width={90} height={15} />
    </li>
  ));
const MainMenu = () => {
  const { data, isLoading } = useSWR(ROUTES.getMenus(), fetcherSWR);
  const router = useRouter();
  return (
    <MainMenuStyled>
      <div className="main-menu">
        <div className="container">
          {!isLoading && (
            <ul>
              {isLoading && <MenuSkeleton value={11} />}
              {data?.map((item: MenuType) => (
                <li key={item.title} className="main-menu-item">
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
                    }}
                    className="main-menu-link"
                  >
                    {item?.title}
                  </span>
                  {!isEmpty(item?.submenu) && (
                    <div
                      className={`submenu ${!item.banner_image ? 'noimg' : ''}`}
                    >
                      <div className="submenu-left">
                        {item.submenu.map((child: any) => (
                          <Link href={`/${child.url}`} key={child.title}>
                            {child.title}
                          </Link>
                        ))}
                      </div>
                      {item.banner_image && (
                        <div className="submenu-right">
                          <ProgressiveImage
                            key={item.title}
                            src={item.banner_image.original || menuimg}
                            alt={item.title}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MainMenuStyled>
  );
};

export default MainMenu;
