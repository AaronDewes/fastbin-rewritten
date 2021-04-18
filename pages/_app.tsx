import { GeistProvider, CssBaseline } from '@geist-ui/react';
import '@/styles/base.scss';

import { useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';

const Fastbin = ({ Component, pageProps }) => {
  const router = useRouter();

  const [themeType] = useState('dark');
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Component {...pageProps} />

      <Head>
        <title>Umbrel debug logs</title>
        <meta name="charset" content="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="title" content="Umbrel debug logs server" />
        <meta name="description" content="Umbrel's server for hosting the debug logs of users" />
      </Head>
    </GeistProvider>
  );
};

export default Fastbin;
