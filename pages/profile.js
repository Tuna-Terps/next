// pages/profile.js
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';



export default withPageAuthRequired(function Profile({ user }) {
  const { error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  return (
    user && (
      <div>
        <Head>
        <title>highorlo | Profile</title>
        <meta name='keywords' content='judging, competitions, ratings, events' />
        </Head>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
  /*
  return (
    <>
    <img src={user.picture} alt={user.name}/>
    <div>Hello {user?.nickname}</div>
    </>
  )
  */
});
