import React, { useMemo } from 'react';
import { BreadcrumbWrapper } from './styled';
import { useRouter } from 'next/router';
import _, { flatten, uniq } from 'lodash';
import { normalizeBreadCrumb } from '../../utilities/helper';
import Link from 'next/link';

const BreadCrumbs = ({ discardBreadCrumbs }: any) => {
  const router = useRouter();
  const DEFAULT_DISCARD_BREADCRUMBS = ['Categories'];
  const DISCARD_BREADCRUMBS = uniq(
    flatten([...DEFAULT_DISCARD_BREADCRUMBS, discardBreadCrumbs])
  );

  const routesArr = useMemo(() => {
    const routerString: any = router.asPath;
    let arr = routerString.split('?')[0];
    arr = arr.split('/');
    arr = _.reject(arr, _.isEmpty);
    arr = normalizeBreadCrumb(arr);
    return _.filter(
      arr,
      (item) =>
        !DISCARD_BREADCRUMBS.includes(item.name) &&
        item.name.toLowerCase() !== 'cms'
    );
  }, [router]);

  const isLast = (routesArr, index) => routesArr.length - 1 === index;

  return (
    <BreadcrumbWrapper className="breadcrumb-wrap">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/home">Home</Link>
            </li>
            {routesArr.map((item, index) => {
              const itemName =
                item.name.charAt(0).toUpperCase() + item.name.slice(1);
              return (
                <li
                  key={item.name}
                  className={`breadcrumb-item ${
                    isLast(routesArr, index) ? 'active' : ''
                  }`}
                  aria-current={isLast(routesArr, index) ? 'page' : undefined}
                  style={{ color: '#fb551d' }}
                >
                  {isLast(routesArr, index) ? (
                    itemName
                  ) : (
                    <Link href={`/${item.url}`}>{itemName}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </BreadcrumbWrapper>
  );
};

export default BreadCrumbs;
