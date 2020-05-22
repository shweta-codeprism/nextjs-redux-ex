/** CSS Imports */
import '../semantic/dist/semantic.min.css';

import Layout from '../components/Layout'


export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>  
  );
}