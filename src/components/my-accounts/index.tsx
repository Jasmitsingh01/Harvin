import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { findIndex } from 'lodash';
import MenuItems from './constant';
import dynamic from 'next/dynamic';
import Loading from '../../shared/Loading';
const RightPane = dynamic(() => import('./RightPane'), {
  ssr: false,
});
const LeftPane = dynamic(() => import('./LeftPane'), {
  ssr: false,
  loading: () => <Loading />, // Use a loading component or a placeholder
});
const MyAccounts = () => {
  const router = useRouter();

  const activeTab = useMemo(() => {
    const url = router.asPath;
    let type = url.split('#') && url.split('#')[1];
    type = type && type.split('?')[0];
    const index = findIndex(
      MenuItems,
      (e: any) => {
        return e.href.match(type);
      },
      0
    );
    return index;
  }, [router]);

  return (
    <div className="my-account-wrap">
      <div className="container">
        <div className="row">
          <LeftPane activeTab={activeTab} />
          <div className="col-md-8 col-lg-9">
            <RightPane activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccounts;
