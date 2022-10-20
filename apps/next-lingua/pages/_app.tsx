import { AppProps } from 'next/app';
import Head from 'next/head';
import 'regenerator-runtime/runtime';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to next-lingua!</title>
      </Head>
      <main className="app bg-blue-300 w-[100vw] h-[100vh]">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
