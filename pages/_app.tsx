import 'styles/tailwind.css';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import seo from 'next-seo.config';
import { trpc } from 'utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo {...seo} />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default trpc.withTRPC(MyApp);
