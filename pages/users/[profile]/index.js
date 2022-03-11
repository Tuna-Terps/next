// pages/profile.js
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';

export default withPageAuthRequired(function Profile({ user }) {
  
  return (
    <>
    <Head>
        <title>highorlo | Profile</title>
        <meta name='keywords' content='judging, competitions, ratings, events' />
    </Head>
    <img src={user.picture} alt={user.name}/>
    <div>Hello {user.nickname}</div>
    </>
  )
});