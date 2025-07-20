import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import BreadCrumbsCms from '../../shared/breadcrumbscms';
import PageNotFound from '../../shared/page-not-found';

const validSlugs = [
  'cookie-policy',
  'terms-conditions',
  'privacy-policy',
  'shipping-policy',
  'return-and-refund-policy',
  'career',
  'about-us',
];

const CmsPage = () => {
  const router = useRouter();
  const { slug } = router.query as any;

  if (!slug || !validSlugs.includes(slug)) {
    return <PageNotFound />;
  }

  const { data, error } = useSWR(() => ROUTES.staticPage(slug), fetcherSWR);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <BreadCrumbsCms />
      <section className="product-listing-title">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <h2>{data?.media?.meta_title}</h2>
          </div>
          <div className="about-content">
            {ReactHtmlParser(data?.media?.content)}
          </div>
        </div>
      </section>
    </>
  );
};

export default CmsPage;
