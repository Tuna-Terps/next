// pages/profile.js
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
// need rw connection to event collection
//import { connectToDatabase } from '../../../components/mongodb.js';

import Form from '../../../components/Form.js'


export default withPageAuthRequired(function create({ data }) {
  const { error, isLoading, user } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
    <Head>
        <title>highorlo | Create an Event</title>
        <meta name='keywords' content='judging, competitions, ratings, events' />
    </Head>
    <img src={user.picture} alt={user.name}/>
    <div>Hello {user.nickname}, welcome to the event creation dashboard</div>

    <Form/>

    </>
  )
});

// todo : server props, validate data from client side, create form and api route


/*
export async function getServerSideProps() {
  //console.log(req)
  //console.log(`createdashboard:28 ${context.query.name}`);
  //console.log(JSON.parse(JSON.stringify(context.query.name)));
  //const id = context.query.name;
  //console.log(context)
  const {db} = await connectToDatabase();
  //const userDb = client.db("users");
  const events = await client
  .collection("eventData")
  .find({})
  .toArray()
  console.log(JSON.parse(JSON.stringify(events)));
  return{
      props:{
          data: JSON.parse(JSON.stringify(events)),
      }
  }
}
*/