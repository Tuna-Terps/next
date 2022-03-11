import Layout from '../components/Layout'
//auth0
import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserProvider>
  )
}

export default MyApp
