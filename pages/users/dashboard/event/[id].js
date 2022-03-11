import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';

// we will use this page to edit existing events
export default withPageAuthRequired(function create({ data }) {
  const { error, isLoading, user } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
    <Head>
        <title>highorlo | Event Edit</title>
        <meta name='keywords' content='judging, competitions, ratings, events' />
    </Head>
    <img src={user.picture} alt={user.name}/>
    <div>Hello {user.nickname}, welcome to the event's dashboard</div>
    </>
  )
});

// todo : server props, validate data from client side, create form and api route