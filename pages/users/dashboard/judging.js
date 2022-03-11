// pages/profile.js
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';

export default withPageAuthRequired(function Profile({ user }) {
    if (user.nickname !== data._refId){
        return(
      <div className={gridStyles.head}>
      <Link href={{
          pathname: `/users/dashboard/`,
          query:{name:`${user.nickname}`}
      }}>
          | ERROR | RETURN TO DASHBOARD
      </Link>
      </div>)
    }
  return (
    <>
    <Head>
        <title>highorlo | Judge Dashboard</title>
        <meta name='keywords' content='judging, competitions, ratings, events' />
    </Head>
    <img src={user.picture} alt={user.name}/>
    <div>Hello {user.nickname}, welcome to the judging dashboard</div>

    </>
  )
});