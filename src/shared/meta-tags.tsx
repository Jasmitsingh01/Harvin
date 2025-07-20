import React from 'react';
import Head from 'next/head';

const defaultProps = {
  title: 'Harvin Chairs',
  description:
    'Test app for testing purpose here list of all sample test products',
  url: 'http://localhost:3000',
  image:
    'https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const MetaTags = (props: any) => {
  const { children, metaData = defaultProps } = props;

  return (
    <>
      <Head>
        <title>{metaData?.title}</title>
        <meta name="description" content={metaData?.description} />
        <meta property="og:title" content={metaData?.title} />
        <meta property="og:description" content={metaData?.description} />
        <meta property="og:image" content={metaData?.image} />
        <meta property="og:url" content={metaData?.url} />
        {/* Add other meta tags as needed */}
      </Head>

      {children}
    </>
  );
};
export default MetaTags;
