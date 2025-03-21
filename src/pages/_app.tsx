import type { AppProps /*, AppContext */ } from 'next/app';
import { ResumeProvider } from '../contexts/ResumeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ResumeProvider>
      <Component {...pageProps} />
    </ResumeProvider>
  );
}

export default MyApp; 