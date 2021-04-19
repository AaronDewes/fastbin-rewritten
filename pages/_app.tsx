import '@/styles/base.scss';

import { useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';


import { init } from '../utils/sentry';

init();

export default function UmbrelDebug({ Component, pageProps, err }) {
  const router = useRouter();
  return (
    <div>
      <Component {...pageProps}  err={err} />

      <Head>
        <title>Umbrel debug logs</title>
        <meta name="charset" content="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="title" content="Umbrel debug logs server" />
        <meta name="description" content="Umbrel's server for hosting the debug logs of users" />
      </Head>
    </div>
  );
};

